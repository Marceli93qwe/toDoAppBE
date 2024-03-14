import {v4 as uuid} from 'uuid';
import {NotFoundError, ValidationError} from "../middlewares/error.middleware";
import {pool} from "../config/db.config";
import {ResultSetHeader, RowDataPacket} from "mysql2";

interface ITaskRecord {
    id?: string;
    taskName: string;
    bookmarkId: string;
    priority: number;
    color: string;
    deadlineDate: string;
    description: string;
}

export class TaskRecord implements ITaskRecord {
    id?: string;
    taskName: string;
    bookmarkId: string;
    priority: number;
    color: string;
    deadlineDate: string;
    description: string;
    active: boolean;

    constructor
    (
        taskName: string,
        bookmarkId: string,
        description: string,
        color: string,
        priority: number,
        deadlineDate: string,
        active: boolean,
        id?: string,
    ) {
        this.id = id;
        this.taskName = taskName;
        this.bookmarkId = bookmarkId;
        this.description = description;
        this.color = color;
        this.priority = priority;
        this.deadlineDate = deadlineDate;
        this.active = active;
    }

    // Method to get all tasks from the database
    static async getAllTasks(bookmarkId: string): Promise<ITaskRecord[]> {
        const query = 'SELECT * FROM `tasks` WHERE bookmarkId = :bookmarkId';
        const values = {bookmarkId};
        const [rows] = (await pool.execute(query, values)) as RowDataPacket[][];
        return rows.map(row => ({
            id: row.id,
            taskName: row.taskName,
            bookmarkId: row.bookmarkId,
            priority: row.priority,
            color: row.color,
            deadlineDate: row.deadlineDate,
            description: row.description,
            active: row.active,
        })) as ITaskRecord[];
    }

    // function that fetches all user's tasks by his ID
    static async getAllUsersTasks(userId: string) {
        console.log('ok', userId)
        const query = `SELECT \`taskName\` FROM \`tasks\`
         JOIN \`bookmarks\` ON tasks.bookmarkId = \`bookmarks\`.\`id\`
         JOIN \`users\` ON \`bookmarks\`.\`userId\` = \`users\`.\`id\`
         WHERE \`users\`.\`id\` = ":userId";`;
        const value = {userId};
        const [rows] = (await pool.execute(query, value)) as RowDataPacket[][];
        return rows.map(row => ({
            id: row.id,
            taskName: row.taskName,
            bookmarkId: row.bookmarkId
        })) as ITaskRecord[];
    }

    // Method to get a specific task from the database
    static async getTask(id: string): Promise<ITaskRecord> {
        const query = 'SELECT * FROM tasks WHERE id = :id';
        const values = {id}
        const [[row]] = await pool.execute(query, values) as RowDataPacket[][];

        if (!row) throw new NotFoundError("Couldn't find the task with this id");

        return {
            id: row.id,
            taskName: row.taskName,
            bookmarkId: row.bookmarkId,
            priority: row.priority,
            color: row.color,
            deadlineDate: row.deadlineDate,
            description: row.description,

        };
    }


    static async deleteTask(taskId: string): Promise<void> {
        const query = 'DELETE FROM tasks WHERE id = :id';
        const values = {id: taskId}
        const [result] = await pool.execute<ResultSetHeader>(query, values);
        if (result.affectedRows === 0) {
            throw new NotFoundError("Couldn't find the task with this id");
        }
    }

    static async clearAllTasks(bookmarkId: string): Promise<void> {
        const query = 'DELETE FROM tasks WHERE bookmarkId = :bookmarkId';
        const values = {bookmarkId};
        const [result] = await pool.execute<ResultSetHeader>(query, values);
        if (result.affectedRows === 0) {
            throw new NotFoundError("Bookmark not found");
        }
    }

    static async updateName(taskId: string, newName: string): Promise<void> {
        const query = "UPDATE `tasks` SET `taskName` = :newName WHERE id = :id";
        const values = {id: taskId, newName};
        const [result] = await pool.execute<ResultSetHeader>(query, values);
        if (result.affectedRows === 0) {
            throw new NotFoundError("Task not found");
        }
    }

    validate(): void {
        if (!this.id) {
            this.id = uuid();
        }
        if (typeof this.taskName !== 'string') {
            throw new ValidationError('Task name must be a string');
        }
    }

    // Method to add task to database
    async addToDatabase(): Promise<void> {

        this.validate();
        const {id, taskName, bookmarkId, priority, color, deadlineDate, description, active} = this;
        const query = `INSERT INTO \`tasks\` (id, taskName, bookmarkId, priority, color, deadlineDate, description, active) VALUES (:id, :taskName, :bookmarkId, :priority, :color, :deadlineDate, :description, :active)`;
        const values = {id, taskName, bookmarkId, priority, color, deadlineDate, description, active};
        await pool.execute(query, values);
    }
}

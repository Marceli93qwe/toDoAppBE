import {v4 as uuid} from 'uuid';
import {NotFoundError, ValidationError} from "../middlewares/error.middleware";
import {pool} from "../config/db.config";
import {ResultSetHeader, RowDataPacket} from "mysql2";

interface ITaskRecord {
    id?: string;
    taskName: string;
    bookmarkId: string;
}

export class TaskRecord implements ITaskRecord {
    id?: string;
    taskName: string;
    bookmarkId: string;

    constructor(taskName: string, bookmarkId: string, description?: string, id?: string) {
        this.id = id;
        this.taskName = taskName;
        this.bookmarkId = bookmarkId;
    }

    // Method to get all tasks from the database
    static async getAllTasks(bookmarkId: string): Promise<ITaskRecord[]> {
        const query = 'SELECT * FROM `tasks` WHERE bookmarkId = :bookmarkId';
        const values = {bookmarkId};
        const [rows] = (await pool.execute(query, values)) as RowDataPacket[][];
        return rows.map(row => ({
            id: row.id,
            taskName: row.taskName,
            bookmarkId: row.bookmarkId
        })) as ITaskRecord[];
    }

    static async getAllUsersTasks(userId: string) {
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
            bookmarkId: row.bookmarkId
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
        const {id, taskName, bookmarkId} = this;
        const query = 'INSERT INTO `tasks` (id, taskName, bookmarkId) VALUES (:id, :taskName, :bookmarkId)';
        const values = {id, taskName, bookmarkId};
        await pool.execute(query, values);
    }
}

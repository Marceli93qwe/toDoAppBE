import {v4 as uuid} from 'uuid';
import {NotFoundError, ValidationError} from "../middlewares/error.middleware";
import {pool} from "../config/db.config";
import {ResultSetHeader, RowDataPacket} from "mysql2";

export class TaskRecord {
    id?: string;
    taskName: string;
    bookmark_id: string;

    constructor(taskName: string, bookmark_id: string, description?: string, id?: string) {
        this.id = id;
        this.taskName = taskName;
        this.bookmark_id = bookmark_id;
    }

    // Method to get all tasks from the database
    static async getAllTasks(bookmark_id: string) {
        console.log(bookmark_id)
        const [rows] = (await pool.execute('SELECT * FROM `tasks` WHERE bookmark_id = :bookmark_id', {bookmark_id})) as RowDataPacket[][];
        return rows;
    }

    // Method to get a specific task from the database
    static async getTask(id: string) {
        const [rows] = await pool.execute('SELECT * FROM tasks WHERE id = :id', {id}) as RowDataPacket[][];
        if (rows.length === 0) throw new NotFoundError("Could't find taskd with this id");
        return rows;
    }

    static async deleteTask(taskId: string) {
        const query = 'DELETE FROM tasks WHERE id = :id'
        const [result] = await pool.execute<ResultSetHeader>(query, {id: taskId});
        if (result.affectedRows === 0) {
            throw new NotFoundError("Task not found");
        }
    }

    static async clearAllTasks(bookmarkId: string) {
        // Execute the query to delete all bookmarks for the user (userId) from the database
        const query = 'DELETE FROM tasks WHERE bookmark_id = ?';
        const [result] = await pool.execute<ResultSetHeader>(query, [bookmarkId]);
        if (result.affectedRows === 0) {
            throw new NotFoundError("Bookmark not found");
        }
    }

    static async updateName(taskId: string, newName: string) {
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

        if (this.bookmark_id.length !== 36) {
            throw new ValidationError('Bookmark ID must be 36 characters long');
        }
    }

    // Method to add task to database
    async addToDatabase() {
        this.validate();
        const [rows] = await pool.execute('INSERT INTO `tasks` (id, taskName, bookmark_id) VALUES (:id, :taskName, :bookmark_id)', {
            id: this.id,
            taskName: this.taskName,
            bookmark_id: this.bookmark_id,
        });
        return rows;
    }
}

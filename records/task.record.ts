import {v4 as uuid} from 'uuid';
import {ValidationError} from "../middlewares/error.middleware";
import {pool} from "../config/db.config"; // Assuming you have this class defined in another module

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
        const [rows] = await pool.execute('SELECT * FROM `tasks` WHERE bookmark_id = :bookmark_id', {bookmark_id});
        return rows;
    }

    // Method to get a specific task from the database
    static async getTask(id: string) {
        const [rows] = await pool.execute('SELECT * FROM tasks WHERE id = :id', {id});
        return rows;
    }

    static async clearBookmarkTasks(bookmark_id: string) {
        const [rows] = await pool.execute('DELETE FROM `tasks` WHERE `bookmark_id` =:bookmark_id', {bookmark_id});
        return rows;
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

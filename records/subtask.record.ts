import {ResultSetHeader, RowDataPacket} from "mysql2";
import {pool} from "../config/db.config";
import {v4 as uuid} from "uuid";
import {NotFoundError, ValidationError} from "../middlewares/error.middleware";

export class SubtaskRecord {
    id?: string;
    subtaskName: string;
    taskId: string;

    constructor(subtaskName: string, taskId: string, description?: string, id?: string) {
        this.id = id;
        this.subtaskName = subtaskName;
        this.taskId = taskId;
    }

    static async getAllSubtasks(taskId: string) {
        const [rows] = (await pool.execute('SELECT * FROM `subtasks` WHERE taskId = :taskId', {taskId})) as RowDataPacket[][];
        return rows;
    }

    static async getSubtask(id: string) {
        const [rows] = await pool.execute('SELECT * FROM subtasks WHERE id = :id', {id}) as RowDataPacket[][];
        if (rows.length === 0) throw new NotFoundError("Couldn't find subtask with this id");
        return rows;
    }

    static async deleteSubtask(subtaskId: string) {
        const query = 'DELETE FROM subtasks WHERE id = :id';
        const [result] = await pool.execute<ResultSetHeader>(query, {id: subtaskId});
        if (result.affectedRows === 0) {
            throw new NotFoundError("Subtask not found");
        }
    }

    static async clearAllSubtasks(taskId: string) {
        const query = 'DELETE FROM subtasks WHERE taskId = ?';
        const [result] = await pool.execute<ResultSetHeader>(query, [taskId]);
        if (result.affectedRows === 0) {
            throw new NotFoundError("Task not found");
        }
    }

    static async updateName(subtaskId: string, newName: string) {
        const query = "UPDATE `subtasks` SET `subtaskName` = :newName WHERE id = :id";
        const values = {id: subtaskId, newName};
        const [result] = await pool.execute<ResultSetHeader>(query, values);
        if (result.affectedRows === 0) {
            throw new NotFoundError("Subtask not found");
        }
    }

    validate(): void {
        if (!this.id) {
            this.id = uuid();
        }

        if (typeof this.subtaskName !== 'string') {
            throw new ValidationError('Subtask name must be a string');
        }

        if (this.taskId.length !== 36) {
            throw new ValidationError('Task ID must be 36 characters long');
        }
    }

    async addToDatabase() {
        this.validate();
        const [rows] = await pool.execute('INSERT INTO `subtasks` (id, subtaskName, taskId) VALUES (:id, :subtaskName, :taskId)', {
            id: this.id,
            subtaskName: this.subtaskName,
            taskId: this.taskId,
        });
        return rows;
    }
}

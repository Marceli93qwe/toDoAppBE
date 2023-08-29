import {ResultSetHeader, RowDataPacket} from "mysql2";
import {pool} from "../config/db.config";
import {v4 as uuid} from "uuid";
import {NotFoundError, ValidationError} from "../middlewares/error.middleware";

interface ISubtaskRecord {
    id?: string;
    subtaskName: string;
    taskId: string;
}

export class SubtaskRecord implements ISubtaskRecord {
    id?: string;
    subtaskName: string;
    taskId: string;

    constructor(subtaskName: string, taskId: string, id?: string) {
        this.id = id;
        this.subtaskName = subtaskName;
        this.taskId = taskId;
    }

    static async getAllSubtasks(taskId: string): Promise<SubtaskRecord[]> {
        const query = 'SELECT * FROM `subtasks` WHERE taskId = :taskId';
        const values = {taskId};
        const [rows] = (await pool.execute(query, values)) as RowDataPacket[][];
        return rows.map(row => new SubtaskRecord(row.subtaskName, row.taskId, row.id));
    }

    static async getSubtask(id: string): Promise<ISubtaskRecord> {
        const query = 'SELECT * FROM subtasks WHERE id = :id';
        const values = {id};
        const [[row]] = await pool.execute(query, values) as RowDataPacket[][];
        if (!row) throw new NotFoundError("Couldn't find subtask with this id");
        return {
            id: row.id,
            subtaskName: row.subtaskName,
            taskId: row.taskId,
        };
    }

    static async deleteSubtask(subtaskId: string): Promise<void> {
        const query = 'DELETE FROM subtasks WHERE id = :id';
        const values = {id: subtaskId}
        const [result] = await pool.execute<ResultSetHeader>(query, values);
        if (result.affectedRows === 0) {
            throw new NotFoundError("Subtask not found");
        }
    }

    static async clearAllSubtasks(taskId: string): Promise<void> {
        const query = 'DELETE FROM subtasks WHERE taskId = :taskId';
        const values = {taskId};
        const [result] = await pool.execute<ResultSetHeader>(query, values);
        if (result.affectedRows === 0) {
            throw new NotFoundError("Task not found");
        }
    }

    static async updateName(subtaskId: string, newName: string): Promise<void> {
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
    }

    async addToDatabase(): Promise<void> {
        this.validate();
        const {id, subtaskName, taskId} = this;
        const query = 'INSERT INTO `subtasks` (id, subtaskName, taskId) VALUES (:id, :subtaskName, :taskId)';
        const values = {
            id,
            subtaskName,
            taskId,
        }
        await pool.execute(query, values);
    }
}

import {pool} from "../config/db.config";
import {ConflictError, ValidationError} from "../middlewares/error.middleware";
import {v4 as uuid} from "uuid";
import {RowDataPacket} from "mysql2";
import {hash} from "bcrypt";

export class UserRecord {
    id?: string;
    username: string;
    email: string;
    password: string;

    constructor({id, username, email, password}: { id?: string, username: string, email: string, password: string }) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.validateFields();
    }

    static async findByEmail(email: string): Promise<UserRecord | null> {
        const query = 'SELECT * FROM users WHERE email = :email LIMIT 1';
        const [rows] = await pool.execute(query, {email}) as RowDataPacket[];
        if (rows.length > 0) {
            const {id, email, username, password} = rows[0];
            return new UserRecord({id, username, password, email});
        } else {
            return null;
        }
    }

    async userExists(): Promise<boolean> {
        const query = 'SELECT COUNT(*) as count FROM users WHERE email = ?';
        const [rows] = await pool.execute(query, [this.email]) as RowDataPacket[];
        return rows[0].count > 0;
    }

    async register() {
        if (await this.userExists()) throw new ConflictError("This email is already taken");
        const query = `INSERT INTO users (id, username, email, password)
                   VALUES (:id, :username, :email, :password)`;
        const values = {
            id: this.id,
            username: this.username,
            email: this.email,
            password: await hash(this.password, 10),
        };
        await pool.execute(query, values);
    }

    validateFields(): void {
        if (!this.id) this.id = uuid();
        if (
            typeof this.id !== 'string' ||
            this.id.length !== 36 ||
            typeof this.username !== 'string' ||
            typeof this.email !== 'string' ||
            !this.email.includes('@') ||
            typeof this.password !== 'string' ||
            this.password.length < 8 ||
            !/[a-z]/.test(this.password) ||
            !/[A-Z]/.test(this.password) ||
            !/\d/.test(this.password) ||
            !/[!@#$%^&*]/.test(this.password)
        ) {
            throw new ValidationError("Given invalid register data");
        }
    }
}
import {pool} from "../config/db.config";
import {ValidationError} from "../middlewares/error.middleware";

export class UserRecord {
    id: string;
    username: string;
    email: string;
    password: string;

    constructor(id: string, username: string, email: string, password: string) {
        this.validateFields();
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    async register() {
        const query = `INSERT INTO users (id, username, email, password)
                   VALUES (:id, :username, :email, :password)`;
        const values = {
            id: this.id,
            username: this.username,
            email: this.email,
            password: this.password,
        };
        const [rows] = await pool.execute(query, values);
    }

    validateFields(): void {
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
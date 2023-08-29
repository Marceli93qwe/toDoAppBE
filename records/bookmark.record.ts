import {v4 as uuid} from 'uuid';
import {pool} from "../config/db.config";
import {ResultSetHeader, RowDataPacket} from "mysql2";
import {NotFoundError, ValidationError} from "../middlewares/error.middleware";
import {UserRecord} from "./user.record";

// Interface to describe the shape of the BookmarkRecord properties
interface IBookmarkRecord {
    id?: string;
    bookmarkName: string;
    userId: string;
}

export class BookmarkRecord implements IBookmarkRecord {
    id?: string;
    bookmarkName: string;
    userId: string;

    // Constructor that accepts an object with properties matching the BookmarkProps interface
    constructor({id, bookmarkName, userId}: IBookmarkRecord) {
        // Assigning the provided id or generating a new UUID using uuidv4()
        this.id = id;
        this.bookmarkName = bookmarkName;
        this.userId = userId;
    }

    static async getBookmark(bookmarkId: string): Promise<IBookmarkRecord> {
        const query = 'SELECT * FROM bookmarks WHERE id = :id';
        const data = {id: bookmarkId}
        const [[row]] = await pool.execute(query, data) as RowDataPacket[][];
        if (!row) throw new NotFoundError("We couldn't find bookmark with specified id");
        const {id, bookmarkName, userId} = row;
        return {id, bookmarkName, userId};
    }

    static async getAllBookmarks(userId: string): Promise<IBookmarkRecord[]> {
        const query = 'SELECT * FROM bookmarks WHERE userId = :userId';
        const values = {userId};
        const [rows] = await pool.execute(query, values) as RowDataPacket[];
        return rows.map((row: RowDataPacket) => {
            const {id, bookmarkName, userId} = row;
            const bookmarks: IBookmarkRecord = {bookmarkName, userId, id};
            return bookmarks;
        });
    }

    static async clearAllBookmarks(userId: string): Promise<void> {
        // Check if the user with the given ID exists
        const user = await UserRecord.findById(userId);
        if (!user) {
            throw new NotFoundError(`User with the provided ID does not exist.`);
        }
        // Execute the query to delete all bookmarks for the user (userId) from the database
        const query = 'DELETE FROM bookmarks WHERE userId = :userId';
        const values = {userId}
        await pool.execute(query, values);
    }

    static async removeBookmark(bookmarkId: string, userId: string): Promise<void> {
        const query = 'DELETE FROM bookmarks WHERE id = :bookmarkId AND userId = :userId';
        const values = {bookmarkId, userId}
        const [result] = await pool.execute<ResultSetHeader>(query, values);
        if (result.affectedRows === 0) {
            throw new NotFoundError("Bookmark not found");
        }
    }

    static async modifyBookmark(bookmarkId: string, newName: string): Promise<void> {
        const query = 'UPDATE bookmarks SET bookmarkName = :newName WHERE id = :bookmarkId'
        const values = {bookmarkId, newName}
        const [result] = await pool.execute<ResultSetHeader>(query, values);
        if (result.affectedRows === 0) {
            throw new NotFoundError("Bookmark not found");
        }
    }

    validate() {
        if (!this.id) {
            this.id = uuid();
        }
        if (typeof this.bookmarkName !== 'string') {
            throw new ValidationError('Bookmark name must be a string');
        }
    }

    // Method to add the bookmark to the database
    async addBookmark() {
        this.validate();
        const query = 'INSERT INTO bookmarks (id, bookmarkName, userId) VALUES (?, ?, ?)';
        const values = [this.id, this.bookmarkName, this.userId];

        // Executing the SQL query using the provided pool object
        await pool.execute(query, values);
    }
}


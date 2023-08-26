import {v4 as uuidv4} from 'uuid';
import {pool} from "../config/db.config";
import {ResultSetHeader, RowDataPacket} from "mysql2";
import {NotFoundError} from "../middlewares/error.middleware";
import {UserRecord} from "./user.record";

// Interface to describe the shape of the BookmarkRecord properties
interface BookmarkProps {
    id?: string;
    bookmarkName: string;
    userId: string;
}

export class BookmarkRecord {
    id?: string;
    bookmarkName: string;
    userId: string;

    // Constructor that accepts an object with properties matching the BookmarkProps interface
    constructor({id, bookmarkName, userId}: BookmarkProps) {
        // Assigning the provided id or generating a new UUID using uuidv4()
        this.id = id || uuidv4();
        this.bookmarkName = bookmarkName;
        this.userId = userId;
    }

    static async findById(bookmarkId: string) {
        const query = 'SELECT * FROM bookmarks WHERE id = :id';
        const data = {id: bookmarkId}
        const [rows] = await pool.execute(query, data) as RowDataPacket[];
        if (!rows[0]) throw new NotFoundError("We couldn't find bookmark with specified id");
        const {id, bookmarkName, userId} = rows[0];
        return new BookmarkRecord({id, bookmarkName, userId})
    }

    static async findByUserId(userId: string): Promise<BookmarkRecord[]> {
        const query = 'SELECT * FROM bookmarks WHERE userId = ?';
        const values = [userId];

        const [rows] = await pool.execute(query, values) as RowDataPacket[];

        // Mappin result of the query to BookmarkRecords
        return rows.map((row: RowDataPacket) => {
            const {id, bookmarkName, userId} = row;
            return new BookmarkRecord({bookmarkName, userId, id});
        });
    }

    static async clearAllBookmarks(userId: string) {
        // Check if the user with the given ID exists
        const user = await UserRecord.findById(userId);
        if (!user) {
            throw new NotFoundError(`User with the provided ID does not exist.`);
        }
        // Execute the query to delete all bookmarks for the user (userId) from the database
        const query = 'DELETE FROM bookmarks WHERE userId = ?';
        await pool.execute(query, [userId]);
    }

    static async removeBookmark(bookmarkId: string, userId: string) {
        const query = 'DELETE FROM bookmarks WHERE id = :bookmarkId AND userId = :userId';
        const [result] = await pool.execute<ResultSetHeader>(query, {bookmarkId, userId});
        if (result.affectedRows === 0) {
            throw new NotFoundError("Bookmark not found");
        }
    }

    static async modifyBookmark(bookmarkId: string, newName: string) {
        const query = 'UPDATE bookmarks SET bookmarkName = :newName WHERE id = :bookmarkId'
        const data = {bookmarkId, newName}
        const [result] = await pool.execute<ResultSetHeader>(query, data);
        if (result.affectedRows === 0) {
            throw new NotFoundError("Bookmark not found");
        }
    }

    // Method to add the bookmark to the database
    async addBookmark() {
        const query = 'INSERT INTO bookmarks (id, bookmarkName, userId) VALUES (?, ?, ?)';
        const values = [this.id, this.bookmarkName, this.userId];

        // Executing the SQL query using the provided pool object
        await pool.execute(query, values);
    }
}


import {v4 as uuidv4} from 'uuid';
import {pool} from "../config/db.config";
import {ResultSetHeader, RowDataPacket} from "mysql2";
import {NotFoundError} from "../middlewares/error.middleware";
import {UserRecord} from "./user.record";

// Interface to describe the shape of the BookmarkRecord properties
interface BookmarkProps {
    id?: string;
    bookmarkName: string;
    user_id: string;
}

export class BookmarkRecord {
    id?: string;
    bookmarkName: string;
    user_id: string;

    // Constructor that accepts an object with properties matching the BookmarkProps interface
    constructor({id, bookmarkName, user_id}: BookmarkProps) {
        // Assigning the provided id or generating a new UUID using uuidv4()
        this.id = id || uuidv4();
        this.bookmarkName = bookmarkName;
        this.user_id = user_id;
    }

    static async findByUserId(user_id: string): Promise<BookmarkRecord[]> {
        const query = 'SELECT * FROM bookmarks WHERE user_id = ?';
        const values = [user_id];

        const [rows] = await pool.execute(query, values) as RowDataPacket[];

        // Mappin result of the query to BookmarkRecords
        return rows.map((row: RowDataPacket) => {
            const {id, bookmarkName, user_id} = row;
            return new BookmarkRecord({bookmarkName, user_id, id});
        });
    }

    static async clearAllBookmarks(userId: string) {
        // Check if the user with the given ID exists
        const user = await UserRecord.findById(userId);
        if (!user) {
            throw new NotFoundError(`User with the provided ID does not exist.`);
        }
        // Execute the query to delete all bookmarks for the user (userId) from the database
        const query = 'DELETE FROM bookmarks WHERE user_id = ?';
        await pool.execute(query, [userId]);
    }

    static async removeBookmark(bookmark_id: string, user_id: string) {
        const query = 'DELETE FROM bookmarks WHERE id = :bookmark_id AND user_id = :user_id';
        const [result] = await pool.execute<ResultSetHeader>(query, {bookmark_id, user_id});
        if (result.affectedRows === 0) {
            throw new NotFoundError("Bookmark not found");
        }
    }

    // Method to add the bookmark to the database
    async addBookmark() {
        const query = 'INSERT INTO bookmarks (id, bookmarkName, user_id) VALUES (?, ?, ?)';
        const values = [this.id, this.bookmarkName, this.user_id];

        // Executing the SQL query using the provided pool object
        await pool.execute(query, values);
    }
}


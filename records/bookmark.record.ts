import {v4 as uuidv4} from 'uuid';
import {pool} from "../config/db.config";
import {RowDataPacket} from "mysql2";

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
        const bookmarks: BookmarkRecord[] = rows.map((row: RowDataPacket) => {
            const {id, bookmarkName, user_id} = row;
            return new BookmarkRecord({bookmarkName, user_id, id});
        });

        return bookmarks;
    }

    // Method to add the bookmark to the database
    async addBookmark() {
        const query = 'INSERT INTO bookmarks (id, bookmarkName, user_id) VALUES (?, ?, ?)';
        const values = [this.id, this.bookmarkName, this.user_id];

        // Executing the SQL query using the provided pool object
        await pool.execute(query, values);
    }
}


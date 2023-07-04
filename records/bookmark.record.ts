import {v4 as uuidv4} from 'uuid';
import {pool} from "../config/db.config";

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

    // Method to add the bookmark to the database
    async addBookmark() {
        const query = 'INSERT INTO bookmarks (id, bookmarkName, user_id) VALUES (?, ?, ?)';
        const values = [this.id, this.bookmarkName, this.user_id];

        // Executing the SQL query using the provided pool object
        await pool.execute(query, values);
    }
}

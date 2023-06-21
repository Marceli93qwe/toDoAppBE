import {UserRecord} from "./user.record";
import {pool} from "../config/db.config";

class BookmarkRecord {
    id: string;
    bookmarkName: string;
    user_id: string;

    constructor(id: string, bookmarkName: string, user_id: string) {
        this.id = id;
        this.bookmarkName = bookmarkName;
        this.user_id = user_id;
    }

    async addBookmark(userId: string, bookmarkName: string) {

        const userExists = await UserRecord.userExists(userId);

        if (userExists) {
            const query = 'INSERT INTO bookmarks (id, bookmarkName, user_id) VALUES (:id, :bookmarkName, :user_id)';
            const values = {
                id: this.id,
                bookmarkName: bookmarkName,
                user_id: userId
            };
            await pool.execute(query, values);
        } else {
            // @todo
            console.log('Użytkownik o podanym ID nie istnieje.');
        }

    }
}

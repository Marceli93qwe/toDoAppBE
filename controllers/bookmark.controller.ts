import {Request, Response} from "express";
import {UserRecord} from "../records/user.record";
import {BookmarkRecord} from "../records/bookmark.record";

export const bookmarkAdd = async (req: Request, res: Response) => {
    // Retrieve bookmark data from the request body
    const {id, bookmarkName, user_id} = req.body;

// Check if the user exists
    const user = await UserRecord.findById(user_id);
    if (!user) {
        return res.status(404).json({error: 'User with the provided ID does not exist.'});
    }
// Create a new instance of BookmarkRecord
    const bookmark = new BookmarkRecord({id, bookmarkName, user_id});

// Add the bookmark to the database
    await bookmark.addBookmark();

    return res.status(201).json({message: 'Bookmark successfully added.'});

}
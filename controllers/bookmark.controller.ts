import {Request, Response} from "express";
import {UserRecord} from "../records/user.record";
import {BookmarkRecord} from "../records/bookmark.record";
import {NotFoundError} from "../middlewares/error.middleware";

export const addBookmark = async (req: Request, res: Response) => {
    // Retrieve bookmark data from the request body
    const {id, bookmarkName} = req.body;
    const {user_id} = req.params;
// Check if the user exists
    await UserRecord.findById(user_id);
// Create a new instance of BookmarkRecord
    const bookmark = new BookmarkRecord({id, bookmarkName, user_id});
// Add the bookmark to the database
    await bookmark.addBookmark();
    return res.status(201).json({message: 'Bookmark successfully added.'});

}

export async function getUserBookmarks(req: Request, res: Response) {
    const {user_id} = req.params;
    // Check if the user exists before retrieving the bookmarks
    const user = await UserRecord.findById(user_id);
    if (!user) {
        throw new NotFoundError('User with the provided ID does not exist.')
    }
    // Retrieve user's bookmarks using findByUserId method
    const bookmarks = await BookmarkRecord.findByUserId(user_id);
    res.json({bookmarks});
}

export const clearBookmarks = async (req: Request, res: Response) => {
    const userId = req.params.user_id;
    await BookmarkRecord.clearAllBookmarks(userId);
    res.status(204).end();
};

export const deleteBookmark = async (req: Request, res: Response) => {
    const {user_id, bookmark_id} = req.params;
    // Check if the bookmark belongs to specified user (user_id), if yes - removes them
    await BookmarkRecord.removeBookmark(bookmark_id, user_id)
    res.status(204).end();
};
import {Request, Response} from "express";
import {UserRecord} from "../records/user.record";
import {BookmarkRecord} from "../records/bookmark.record";

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

export const getSingleBookmark = async (req: Request, res: Response) => {
    const {bookmark_id} = req.params;
    const bookmark = await BookmarkRecord.findById(bookmark_id);
    res.json({bookmark});
}

export async function getUserBookmarks(req: Request, res: Response) {
    const {user_id} = req.params;
    // Check if the user exists before retrieving the bookmarks
    await UserRecord.findById(user_id);
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

export const modifyBookmark = async (req: Request, res: Response) => {
    const {bookmark_id} = req.params;
    //get the new bookmarkName from request body
    const {bookmarkName} = req.body;
    //modify the specified data
    await BookmarkRecord.modifyBookmark(bookmark_id, bookmarkName);
    res.status(204).end();
}
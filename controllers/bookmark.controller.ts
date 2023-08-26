import {Request, Response} from "express";
import {UserRecord} from "../records/user.record";
import {BookmarkRecord} from "../records/bookmark.record";

export const addBookmark = async (req: Request, res: Response) => {
    // Retrieve bookmark data from the request body
    const {id, bookmarkName} = req.body;
    const {userId} = req.params;
// Checks if the user exists
    await UserRecord.findById(userId);
// Create a new instance of BookmarkRecord
    const bookmark = new BookmarkRecord({id, bookmarkName, userId});
// Add the bookmark to the database
    await bookmark.addBookmark();
    return res.status(201).json({message: 'Bookmark successfully added.'});
}

export const getSingleBookmark = async (req: Request, res: Response) => {
    const {bookmarkId} = req.params;
    const bookmark = await BookmarkRecord.findById(bookmarkId);
    res.json({bookmark});
}

export const getUserBookmarks = async (req: Request, res: Response) => {
    const {userId} = req.params;
    // Check if the user exists before retrieving the bookmarks
    await UserRecord.findById(userId);
    // Retrieve user's bookmarks using findByUserId method
    const bookmarks = await BookmarkRecord.findByUserId(userId);
    res.json({bookmarks});
}

export const clearBookmarks = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    await BookmarkRecord.clearAllBookmarks(userId);
    res.status(204).end();
};

export const deleteBookmark = async (req: Request, res: Response) => {
    const {userId, bookmarkId} = req.params;
    // Check if the bookmark belongs to specified user (userId), if yes - removes them
    await BookmarkRecord.removeBookmark(bookmarkId, userId)
    res.status(204).end();
};

export const modifyBookmark = async (req: Request, res: Response) => {
    const {bookmarkId} = req.params;
    //get the new bookmarkName from request body
    const {updatedName} = req.body;
    //modify the specified data
    await BookmarkRecord.modifyBookmark(bookmarkId, updatedName);
    res.status(204).end();
}
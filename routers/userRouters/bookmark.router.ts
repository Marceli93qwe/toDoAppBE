import {
    addBookmark,
    clearBookmarks,
    deleteBookmark,
    getSingleBookmark,
    getUserBookmarks,
    modifyBookmark
} from "../../controllers/bookmark.controller";
import {Router} from "express";

export const bookmarkRouter = Router({mergeParams: true})

// GET

bookmarkRouter.get('/', getUserBookmarks);
bookmarkRouter.get("/:bookmarkId", getSingleBookmark);
// POST
bookmarkRouter.post("/", addBookmark);
// DELETE
bookmarkRouter.delete("/", clearBookmarks);
bookmarkRouter.delete("/:bookmarkId", deleteBookmark);
// PUT
bookmarkRouter.put("/:bookmarkId", modifyBookmark);

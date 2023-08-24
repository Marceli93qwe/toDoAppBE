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
bookmarkRouter.get("/:bookmark_id", getSingleBookmark);
// POST
bookmarkRouter.post("/", addBookmark);
// DELETE
bookmarkRouter.delete("/", clearBookmarks);
bookmarkRouter.delete("/:bookmark_id", deleteBookmark);
// PUT
bookmarkRouter.put("/:bookmark_id", modifyBookmark);

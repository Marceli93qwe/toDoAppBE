import {
    addBookmark,
    clearBookmarks,
    deleteBookmark,
    getUserBookmarks,
    modifyBookmark
} from "../controllers/bookmark.controller";
import express from "express";
import {addTask, getAllTasksFromBookmark} from "../controllers/task.controller";

export const userRouter = express.Router();

// GET /users/:user_id/bookmarks
userRouter.get('/:user_id/bookmarks', getUserBookmarks);
userRouter.get("/:user_id/bookmarks/:bookmark_id", getAllTasksFromBookmark);
// POST /users/:user_id/bookmarks
userRouter.post("/:user_id/bookmarks", addBookmark);
userRouter.post("/:user_id/bookmarks/:bookmark_id", addTask);

// DELETE
userRouter.delete("/:user_id/bookmarks", clearBookmarks);
userRouter.delete("/:user_id/bookmarks/:bookmark_id", deleteBookmark);
// PUT
userRouter.put("/:user_id/bookmarks/:bookmark_id", modifyBookmark);


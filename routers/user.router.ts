import {addBookmark, clearBookmarks, deleteBookmark, getUserBookmarks} from "../controllers/bookmark.controller";
import express from "express";

export const userRouter = express.Router();

// GET /users/:user_id/bookmarks
userRouter.get('/:user_id/bookmarks', getUserBookmarks);
// POST /users/:user_id/bookmarks
userRouter.post("/:user_id/bookmarks", addBookmark);
userRouter.delete("/:user_id/bookmarks", clearBookmarks)
userRouter.delete("/:user_id/bookmarks/:bookmark_id", deleteBookmark)


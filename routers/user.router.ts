import {
    addBookmark,
    clearBookmarks,
    deleteBookmark,
    getUserBookmarks,
    modifyBookmark
} from "../controllers/bookmark.controller";
import express from "express";
import {
    addTask,
    clearTasks,
    deleteTask,
    getAllTasksFromBookmark,
    getSingleTask,
    updateTaskName
} from "../controllers/task.controller";

export const userRouter = express.Router();

// GET /users/:user_id/bookmarks
userRouter.get('/:user_id/bookmarks', getUserBookmarks);
userRouter.get("/:user_id/bookmarks/:bookmark_id", getAllTasksFromBookmark);
userRouter.get("/:user_id/bookmarks/:bookmark_id/tasks/:task_id", getSingleTask);

// POST /users/:user_id/bookmarks
userRouter.post("/:user_id/bookmarks", addBookmark);
userRouter.post("/:user_id/bookmarks/:bookmark_id", addTask);

// DELETE
userRouter.delete("/:user_id/bookmarks", clearBookmarks);
userRouter.delete("/:user_id/bookmarks/:bookmark_id", deleteBookmark);
userRouter.delete("/:user_id/bookmarks/:bookmark_id/tasks", clearTasks);
userRouter.delete("/:user_id/bookmarks/:bookmark_id/tasks/:task_id", deleteTask);
// PUT
userRouter.put("/:user_id/bookmarks/:bookmark_id", modifyBookmark);
userRouter.put("/:user_id/bookmarks/:bookmark_id/tasks/:task_id", updateTaskName);



import express from "express";
import {bookmarkRouter} from "./bookmark.router";
import {taskRouter} from "./task.router";
import {subtaskRouter} from "./subtask.router";

export const userRouter = express.Router();

userRouter.use("/:userId/bookmarks", bookmarkRouter);
userRouter.use("/:userId/bookmarks/:bookmarkId/tasks", taskRouter);
userRouter.use("/:userId/bookmarks/:bookmarkId/tasks/:taskId/subtasks", subtaskRouter);


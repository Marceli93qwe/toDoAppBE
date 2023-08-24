import express from "express";
import {bookmarkRouter} from "./bookmark.router";
import {taskRouter} from "./task.router";
import {subtaskRouter} from "./subtask.router";

export const userRouter = express.Router();

userRouter.use("/:user_id/bookmarks", bookmarkRouter);
userRouter.use("/:user_id/bookmarks/:bookmark_id/tasks", taskRouter);
userRouter.use("/:user_id/bookmarks/:bookmark_id/tasks/:task_id/subtasks", subtaskRouter);


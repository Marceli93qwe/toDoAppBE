import express from "express";
import {bookmarkRouter} from "./bookmark.router";
import {taskRouter} from "./task.router";
import {subtaskRouter} from "./subtask.router";
import {verifyJWT} from "../../middlewares/verifyJWT";

export const userRouter = express.Router();

console.log("x")
userRouter.use("/bookmarks", verifyJWT, bookmarkRouter);
userRouter.use("/bookmarks/tasks", verifyJWT, taskRouter);
userRouter.use("/bookmarks/:bookmarkId/tasks", verifyJWT, taskRouter);
userRouter.use("/bookmarks/:bookmarkId/tasks/:taskId/subtasks", verifyJWT, subtaskRouter);


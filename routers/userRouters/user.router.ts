import express from "express";
import {bookmarkRouter} from "./bookmark.router";

export const userRouter = express.Router();

userRouter.use("/:user_id/bookmarks", bookmarkRouter)

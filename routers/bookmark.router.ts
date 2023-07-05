import express from 'express';
import {addBookmark, getUserBookmarks} from "../controllers/bookmark.controller";

const bookmarkRouter = express.Router();

// Endpoint POST /bookmarks
bookmarkRouter
    .post('/', addBookmark)
    .get("/:user_id", getUserBookmarks)

export default bookmarkRouter;

import express from 'express';
import {bookmarkAdd} from "../controllers/bookmark.controller";

const bookmarkRouter = express.Router();

// Endpoint POST /bookmarks
bookmarkRouter.post('/', bookmarkAdd);

export default bookmarkRouter;

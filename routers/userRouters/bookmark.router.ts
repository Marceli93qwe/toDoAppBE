import {
    addBookmark,
    clearBookmarks,
    deleteBookmark,
    getUserBookmarks,
    modifyBookmark
} from "../../controllers/bookmark.controller";
import {userRouter} from "./user.router";


// GET
userRouter.get('/:user_id/bookmarks', getUserBookmarks);
// userRouter.get("/:user_id/bookmarks/:bookmark_id", ); //@todo
// POST
userRouter.post("/:user_id/bookmarks", addBookmark);
// DELETE
userRouter.delete("/:user_id/bookmarks", clearBookmarks);
userRouter.delete("/:user_id/bookmarks/:bookmark_id", deleteBookmark);
// PUT
userRouter.put("/:user_id/bookmarks/:bookmark_id", modifyBookmark);

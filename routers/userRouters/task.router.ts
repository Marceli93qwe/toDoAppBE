import {
    addTask,
    clearTasks,
    deleteTask,
    getAllTasksFromBookmark,
    getSingleTask,
    updateTaskName
} from "../../controllers/task.controller";
import {userRouter} from "./user.router";
// GET
userRouter.get("/:user_id/bookmarks/:bookmark_id/tasks", getAllTasksFromBookmark);
userRouter.get("/:user_id/bookmarks/:bookmark_id/tasks/:task_id", getSingleTask);
// POST
userRouter.post("/:user_id/bookmarks/bookmark_id/tasks", addTask);
// DELETE
userRouter.delete("/:user_id/bookmarks/:bookmark_id/tasks", clearTasks);
userRouter.delete("/:user_id/bookmarks/:bookmark_id/tasks/:task_id", deleteTask);
// PUT
userRouter.put("/:user_id/bookmarks/:bookmark_id/tasks/:task_id", updateTaskName);
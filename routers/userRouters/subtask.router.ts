import {
    addSubtask,
    clearSubtasks,
    getAllSubtasksFromTask,
    getSingleSubtask,
    updateSubtaskName
} from "../../controllers/subtask.controller";
import {userRouter} from "./user.router";

// GET
userRouter.get("/:user_id/bookmarks/:bookmark_id/tasks/:task_id/subtasks", getAllSubtasksFromTask);
userRouter.get("/:user_id/bookmarks/:bookmark_id/tasks/:task_id/subtasks/:subtask_id", getSingleSubtask);
// POST
userRouter.post("/:user_id/bookmarks/:bookmark_id/tasks/:task_id/subtasks", addSubtask);
// PUT
userRouter.put("/:user_id/bookmarks/:bookmark_id/tasks/:task_id/subtasks/:subtask_id", updateSubtaskName);
// DELETE
userRouter.delete("/:user_id/bookmarks/:bookmark_id/tasks/:task_id/subtasks", clearSubtasks);
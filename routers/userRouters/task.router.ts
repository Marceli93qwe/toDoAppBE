import {
    addTask,
    clearTasks,
    deleteTask,
    getAllTasksFromBookmark,
    getSingleTask,
    updateTaskName
} from "../../controllers/task.controller";
import {Router} from "express";

export const taskRouter = Router({mergeParams: true})

// GET
taskRouter.get("/", getAllTasksFromBookmark);
taskRouter.get("/:task_id", getSingleTask);
// POST
taskRouter.post("/", addTask);
// DELETE
taskRouter.delete("/", clearTasks);
taskRouter.delete("/:task_id", deleteTask);
// PUT
taskRouter.put("/:task_id", updateTaskName);
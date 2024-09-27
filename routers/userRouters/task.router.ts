import {
    addTask,
    clearTasks,
    deleteTask,
    getAllTasksFromBookmark,
    getAllUsersTasks,
    getSingleTask,
    updateTaskName
} from "../../controllers/task.controller";
import {Router} from "express";

export const taskRouter = Router({mergeParams: true})

// GET
taskRouter.get("/all", getAllUsersTasks);
taskRouter.get("/", getAllTasksFromBookmark);
taskRouter.get("/:taskId", getSingleTask);
// POST
taskRouter.post("/", addTask);
// DELETE
taskRouter.delete("/", clearTasks);
taskRouter.delete("/:taskId", deleteTask);
// PUT
taskRouter.put("/:taskId", updateTaskName);
import {
    addSubtask,
    clearSubtasks,
    getAllSubtasksFromTask,
    getSingleSubtask,
    updateSubtaskName
} from "../../controllers/subtask.controller";
import {Router} from "express";

export const subtaskRouter = Router({mergeParams: true})

// GET
subtaskRouter.get("/", getAllSubtasksFromTask);
subtaskRouter.get("/:subtask_id", getSingleSubtask);
// POST
subtaskRouter.post("/", addSubtask);
// PUT
subtaskRouter.put("/:subtask_id", updateSubtaskName);
// DELETE
subtaskRouter.delete("/", clearSubtasks);
import {
    addSubtask,
    clearSubtasks, deleteSubtask,
    getAllSubtasksFromTask,
    getSingleSubtask,
    updateSubtaskName
} from "../../controllers/subtask.controller";
import {Router} from "express";

export const subtaskRouter = Router({mergeParams: true})

// GET
subtaskRouter.get("/", getAllSubtasksFromTask);
subtaskRouter.get("/:subtaskId", getSingleSubtask);
// POST
subtaskRouter.post("/", addSubtask);
// PUT
subtaskRouter.put("/:subtaskId", updateSubtaskName);
// DELETE
subtaskRouter.delete("/", clearSubtasks);
subtaskRouter.delete("/:subtaskId", deleteSubtask);
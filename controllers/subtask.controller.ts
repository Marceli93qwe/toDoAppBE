import {Request, Response} from "express";
import {SubtaskRecord} from "../records/subtask.record";

export const getAllSubtasksFromTask = async (req: Request, res: Response): Promise<void> => {
    // Here we retrieve the taskId from the route parameters
    const taskId: string = req.params.task_id;

    const subtasks = await SubtaskRecord.getAllSubtasks(taskId);

    // Send the response back to the client
    res.status(200).json({
        taskId,
        subtasks
    });
};

export async function addSubtask(req: Request, res: Response,) {
    // Get the task ID from the request path
    const {task_id} = req.params;

    // Get the subtask data from the request body
    const {subtaskName} = req.body;

    // Create a new subtask record
    const subtask = new SubtaskRecord(subtaskName, task_id);

    // Add the subtask to the database
    await subtask.addToDatabase();

    // Send a 201 Created status code along with the subtask data
    res.status(201).json(subtask);
}

export const clearSubtasks = async (req: Request, res: Response) => {
    const {task_id} = req.params;
    await SubtaskRecord.clearAllSubtasks(task_id);
    res.status(204).end();
}

export const getSingleSubtask = async (req: Request, res: Response) => {
    const {subtask_id} = req.params;
    const subtask = await SubtaskRecord.getSubtask(subtask_id);
    res.json({subtask});
}

export const deleteSubtask = async (req: Request, res: Response) => {
    const {subtask_id} = req.params;
    await SubtaskRecord.deleteSubtask(subtask_id);
    res.status(204).end();
}

export const updateSubtaskName = async (req: Request, res: Response) => {
    const {subtask_id} = req.params;
    const {newName} = req.body;
    await SubtaskRecord.updateName(subtask_id, newName);
    res.status(204).end();
}

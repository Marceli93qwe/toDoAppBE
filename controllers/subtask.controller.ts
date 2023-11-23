import {Request, Response} from "express";
import {SubtaskRecord} from "../records/subtask.record";


export const getAllSubtasksFromTask = async (req: Request, res: Response): Promise<void> => {
    // Here we retrieve the taskId from the route parameters
    const {taskId} = req.params;

    const subtasks = await SubtaskRecord.getAllSubtasks(taskId);

    // Send the response back to the client
    res.status(200).json({
        taskId,
        subtasks
    });
};

export const addSubtask = async (req: Request, res: Response) => {
    // Get the task ID from the request path
    const {taskId} = req.params;

    // Get the subtask data from the request body
    const {subtaskName} = req.body;

    // Create a new subtask record
    const subtask = new SubtaskRecord(subtaskName, taskId);

    // Add the subtask to the database
    await subtask.addToDatabase();

    // Send a 201 Created status code along with the subtask data
    res.status(201).json(subtask);
}

export const clearSubtasks = async (req: Request, res: Response) => {
    const {taskId} = req.params;
    await SubtaskRecord.clearAllSubtasks(taskId);
    res.status(204).end();
}

export const getSingleSubtask = async (req: Request, res: Response) => {
    const {subtaskId} = req.params;
    const subtask = await SubtaskRecord.getSubtask(subtaskId);
    res.json({subtask});
}

export const deleteSubtask = async (req: Request, res: Response) => {
    const {subtaskId} = req.params;
    await SubtaskRecord.deleteSubtask(subtaskId);
    res.status(204).end();
}

export const updateSubtaskName = async (req: Request, res: Response) => {
    const {subtaskId} = req.params;
    const {newName} = req.body;
    await SubtaskRecord.updateName(subtaskId, newName);
    res.status(204).end();
}


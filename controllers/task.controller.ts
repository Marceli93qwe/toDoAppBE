import {Request, Response} from "express";
import {TaskRecord} from "../records/task.record";

export const getAllTasksFromBookmark = async (req: Request, res: Response): Promise<void> => {
    // Here we retrieve the bookmarkId from the route parameters
    const {bookmarkId} = req.params;

    const tasks = await TaskRecord.getAllTasks(bookmarkId);

    // Send the response back to the client
    res.status(200).json({
        bookmarkId,
        tasks
    });
};

export const addTask = async (req: Request, res: Response) => {
    // Get the bookmark ID from the request path
    const {bookmarkId} = req.params;

    // Get the task data from the request body
    const {taskName, description} = req.body;

    // Create a new task record
    const task = new TaskRecord(taskName, bookmarkId, description);

    // Add the task to the database
    await task.addToDatabase();

    // Send a 201 Created status code along with the task data
    res.status(201).json(task);
}

export const clearTasks = async (req: Request, res: Response) => {
    const {bookmarkId} = req.params;
    await TaskRecord.clearAllTasks(bookmarkId)
    res.status(204).end();
}

export const getSingleTask = async (req: Request, res: Response) => {
    const {taskId} = req.params;
    const task = await TaskRecord.getTask(taskId);
    res.json({task,});
}

export const deleteTask = async (req: Request, res: Response) => {
    const {taskId} = req.params;
    await TaskRecord.deleteTask(taskId);
    res.status(204).end();
}

export const updateTaskName = async (req: Request, res: Response) => {
    const {taskId} = req.params;
    const {updatedName} = req.body;
    await TaskRecord.updateName(taskId, updatedName);
    res.status(204).end();
}

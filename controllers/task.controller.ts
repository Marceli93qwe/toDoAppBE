import {Request, Response} from "express";
import {TaskRecord} from "../records/task.record";

export const getAllTasksFromBookmark = async (req: Request, res: Response): Promise<void> => {
    // Here we retrieve the bookmarkId from the route parameters
    const bookmarkId: string = req.params.bookmark_id;

    const tasks = await TaskRecord.getAllTasks(bookmarkId);

    // Send the response back to the client
    res.status(200).json({
        bookmarkId,
        tasks
    });
};

export async function addTask(req: Request, res: Response,) {
    // Get the bookmark ID from the request path
    const {bookmark_id} = req.params;

    // Get the task data from the request body
    const {taskName, description} = req.body;

    // Create a new task record
    const task = new TaskRecord(taskName, bookmark_id, description);

    // Add the task to the database
    await task.addToDatabase();

    // Send a 201 Created status code along with the task data
    res.status(201).json(task);
}

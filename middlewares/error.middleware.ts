import {NextFunction, Request, Response} from "express";

export class ValidationError extends Error {
};


export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ValidationError) {
        res.status(404);
        res.json({message: err.message});
    } else {
        res.status(500);
        res.json({message: 'Internal server error'});
    }
}
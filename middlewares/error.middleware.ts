import {NextFunction, Request, Response} from "express";

export class ValidationError extends Error {
}

export class NotFoundError extends Error {
}

export class UnauthorizedError extends Error {

}

export class ConflictError extends Error {
}


export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    const {message} = err;
    if (err instanceof ValidationError || err instanceof NotFoundError) {
        res.status(404);
        res.json({message});
    } else if (err instanceof ConflictError) {
        res.status(409);
        res.json({message});
    } else if (err instanceof UnauthorizedError) {
        res.status(401);
        res.json({message});
    } else {
        res.status(500);
        res.json({message: 'Internal server error'});
    }
}
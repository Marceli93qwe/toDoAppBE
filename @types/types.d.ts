import {Request} from "express";

export interface UserIdRequest extends Request {
    userId: string;
    userEmail: string;
}

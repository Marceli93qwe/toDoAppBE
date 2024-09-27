import {NextFunction, Request, Response} from "express";
import {decode, JwtPayload} from "jsonwebtoken";
import * as string_decoder from "string_decoder";
import {UserIdRequest} from "../@types/types";

export const verifyJWT = (req: UserIdRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; //Downloading a token from the "Bearer <TOKEN>" format

    if (!token) {
        return res.status(403).send('Token required.');
    }

    try {
        const decoded = decode(token);
        req.userId = (decoded as JwtPayload).id;  // Assuming 'id' is a field in our JWT.
        next();
    } catch (err) {
        return res.status(401).send('Wrong token given.');
    }
};
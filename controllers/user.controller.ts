import {NextFunction, Request, Response} from "express";
import dotenv from "dotenv";
import {sign} from "jsonwebtoken";
import {compare} from "bcrypt";
import {NotFoundError, UnauthorizedError} from "../middlewares/error.middleware";
import {UserRecord} from "../records/user.record";


dotenv.config()
export const register = async (req: Request, res: Response, next: NextFunction) => {
    const {email, username, password} = req.body;
    const newUser = new UserRecord({username, email, password});
    await newUser.register();
    res.status(201).send({message: "Created new user successfully"})
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body;
    const user = await UserRecord.findByEmail(email);
    if (!user) throw new NotFoundError("couldn't find user with this email");
    if (await compare(password, user.password)) {
        const token = sign({id: user.id}, process.env.SECRET_KEY);
        return res.json({token})
    }
    throw new UnauthorizedError("Wrong password given");
}
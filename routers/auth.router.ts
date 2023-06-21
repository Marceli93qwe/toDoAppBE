import {Router} from "express";
import {login, register} from "../controllers/user.controller";

export const authRouter = Router();


authRouter
    .post("/login", login)
    .post("/register", register)


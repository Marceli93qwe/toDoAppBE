import {Router} from "express";
import {authenticate, login, register} from "../controllers/auth.controller";
import {verifyJWT} from "../middlewares/verifyJWT";

export const authRouter = Router();


authRouter
    .get("/authenticate", verifyJWT, authenticate)
    .post("/login", login)
    .post("/register", register)


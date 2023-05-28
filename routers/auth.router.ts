import {Router} from "express";
import {UserRecord} from "../records/user.record";

export const authRouter = Router();


authRouter
    .post("/login", async (req, res) => {
        // @todo login action
    })
    .post("/register", async (req, res) => {
        // @todo register action
        const user = new UserRecord("123", "Testowy", "testowy@gmail.com", "jajco");
        // await user.register();
    })


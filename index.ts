import express from "express";
import "express-async-errors";
import {authRouter} from "./routers/auth.router";
import {errorHandler} from "./middlewares/error.middleware";
import {userRouter} from "./routers/userRouters/user.router";
import cors from "cors";

const app = express();

app.use(cors())
app.use(express.json())
app.use("/auth", authRouter)
app.use("/users", userRouter)
app.use(errorHandler);
app.listen(3001, "192.168.31.115", () => console.log("Listening on http://192.168.31.115:3001"));
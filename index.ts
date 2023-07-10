import express from "express";
//@TODO check if that works properly
import "express-async-errors";
import {homeRouter} from "./routers/home.router";
import {authRouter} from "./routers/auth.router";
import {errorHandler} from "./middlewares/error.middleware";
import {userRouter} from "./routers/user.router";

const app = express();

app.use(express.json())
app.use("/", homeRouter);
app.use("/auth", authRouter)
app.use("/users", userRouter)
app.use(errorHandler);
app.listen(3001, "localhost", () => console.log("Listening on http://localhost:3001"));
import express from "express";
//@TODO check if that works properly
import "express-async-errors";
import {homeRouter} from "./routers/home.router";

const app = express();

app.use("/", homeRouter);
app.listen(3001, "localhost", () => console.log("Listening on http://localhost:3001"));
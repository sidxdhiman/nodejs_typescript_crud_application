import express, { Router } from "express";
import { connection } from "./database/index";
import bodyParser from "./middleware/middleware";
import routers from "./routes/router";

const app = express();
connection
    .then(() => console.log("Connected to MongoDB"))
    .catch((error:Error) => console.error('Error connecting yo MongoDB', (error)));

app.use(bodyParser.json());

app.use(routers);

export default app;

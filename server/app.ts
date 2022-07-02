import dotenv from "dotenv";
dotenv.config({path:'.env.local'});

import express from "express";
import cors from "cors";
import compression from "compression";
import bodyParser from "body-parser";
import routes from "./routes";

const app = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.use(compression());

app.use("/", routes);

export default app;



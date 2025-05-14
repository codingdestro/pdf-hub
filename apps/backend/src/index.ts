import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import Database from "./config/db";
const db = Database.getInstance();
import loginRoute from "../src/routes/login.routes";
import uploadRoute from "../src/routes/upload.routes";

dotenv.config();

const PORT = 8080;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Handling routes
app.use("/api", loginRoute);
app.use("/api", uploadRoute);

db.connect();
app.listen(PORT, () => console.log(`server is running on port -> ${PORT}`));

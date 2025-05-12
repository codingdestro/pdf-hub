import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import Database from "./config/db";
const db = Database.getInstance();

dotenv.config();

const PORT = 8080;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.connect();
app.listen(PORT, () => console.log(`server is running on port -> ${PORT}`));

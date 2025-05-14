import { Router } from "express";
import { auth } from "../middleware/auth.middleware";
import { uploadFile } from "../controllers/files/filehandler.controller";
const route = Router();

route.post("/upload", auth, uploadFile);
export default route;

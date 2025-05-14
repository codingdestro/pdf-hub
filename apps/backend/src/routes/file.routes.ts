import { Router } from "express";
import { auth } from "../middleware/auth.middleware";
import {
  deleteFile,
  downloadFile,
  fetchAFile,
  fetchFiles,
} from "../controllers/files/filehandler.controller";

const route = Router();

route.post("/files", auth, fetchFiles);
route.post("/file", auth, fetchAFile);
route.post("/file/download", auth, downloadFile);
route.delete("/file/", auth, deleteFile);

export default route;

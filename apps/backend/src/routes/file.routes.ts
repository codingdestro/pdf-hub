import { Router } from "express";
import { auth } from "../middleware/auth.middleware";
import {
  deleteFile,
  downloadFile,
  fetchAFile,
  fetchFiles,
} from "../controllers/files/filehandler.controller";
import {
  extractPDFPages,
  mergePDF,
  removePDFPages,
} from "../controllers/files/fileEditor.controller";

const route = Router();

route.post("/files", auth, fetchFiles);
route.post("/file", auth, fetchAFile);
route.post("/file/download", auth, downloadFile);
route.delete("/file/", auth, deleteFile);
route.post("/files/merge", auth, mergePDF);
route.post("/file/extract", auth, extractPDFPages);
route.post("/file/remove", auth, removePDFPages);

export default route;

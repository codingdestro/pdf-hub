import multer from "multer";
import type { FileFilterCallback } from "multer";
import path from "path";
import { v4 as uuid } from "uuid";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadFilePath = path.join("uploads");
    cb(null, uploadFilePath);
  },

  filename(req, file, callback) {
    const filename = `${uuid()}-${file.originalname}`;
    req.body.filename = filename;
    callback(null, filename);
  },
});

export const fileUpload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 6 },
  fileFilter(req, file, cb: FileFilterCallback) {
    if (file.mimetype != "application/pdf" || file.size >= 1024 * 1024 * 6) {
      cb(new Error("file type not excepted"));
    } else cb(null, true);
  },
});

import type { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { fileUpload } from "../../middleware/upload.middleware";
import File from "../../models/files.model";

export const uploadFile = async (req: Request, res: Response) => {
  try {
    await fileUpload.single("file")(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ err: "file not excepted" });
      }

      const userId = res.locals.user["user_id"];
      if (userId) {
        const newFile = new File({
          file_id: uuid(),
          filename: req.body.filename,
          user_id: userId,
        });
        await newFile.save();
      } else {
        console.log("file not saved in db");
      }

      res.status(200).json({ msg: "file has been uploaded" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "failed to upload file" });
  }
};

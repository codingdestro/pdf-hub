import type { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { fileUpload } from "../../middleware/upload.middleware";
import File from "../../models/files.model";
import fs from "node:fs";

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

export const fetchFiles = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user["user_id"];
    if (!userId) throw new Error("forbidden access!");
    const userFiles = await File.find({
      user_id: userId,
    });
    res.status(200).json({ msg: "fetched all files", files: userFiles });
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "Internal Server Error!" });
  }
};

export const fetchAFile = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user["user_id"];
    const fileId = req.body.fileId;
    if (!userId || !fileId) throw new Error("forbidden access!");
    const userFile = await File.findOne({
      user_id: userId,
      file_id: fileId,
    });
    res.status(200).json({ msg: "fetched file", file: userFile });
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "Internal Server Error!" });
  }
};

export const downloadFile = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user["user_id"];
    const fileId = req.body.fileId;
    if (!userId || !fileId) throw new Error("forbidden access!");
    const userFile = await File.findOne({
      user_id: userId,
      file_id: fileId,
    });
    if (!userFile?.filename) res.status(400).json({ err: "file not found!" });
    res.download(`uploads/${userFile!.filename!}`);
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "Internal Server Error!" });
  }
};

export const deleteFile = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user["user_id"];
    const fileId = req.body.fileId;
    if (!userId || !fileId) throw new Error("forbidden access!");
    const userFile = await File.findOne({
      user_id: userId,
      file_id: fileId,
    });
    if (!userFile?.filename) res.status(400).json({ err: "file not found!" });

    await File.deleteOne({ file_id: fileId });

    fs.unlinkSync(`uploads/${userFile!.filename}`);

    res.status(200).json({ msg: "file has been deleted", fileId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "Internal Server Error!" });
  }
};

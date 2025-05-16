import type { Request, Response } from "express";
import fs from "node:fs";
import { v4 as uuid } from "uuid";
import { extractPages, mergePdf, removePages } from "../../utils/fileHandler";
import File from "../../models/files.model";

export const mergePDF = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user["userId"];
    const { fileIds } = req.body;

    if (!fileIds || !Array.isArray(fileIds)) {
      res.status(400).json({ err: "files not selected" });
      return;
    }

    const pdfBuffer = await mergePdf(fileIds);
    const newFileId = uuid();
    const filename = newFileId + "-merge.pdf";
    fs.writeFileSync(`uploads/${filename}`, pdfBuffer);
    const newFile = new File({
      file_id: newFileId,
      user_id: userId,
      filename,
    });
    await newFile.save();

    res.status(200).json({ msg: "files has been merged", fileId: filename });
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "Internal Server Error!" });
  }
};

export const extractPDFPages = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user["user_id"];
    const { fileId, indices } = req.body;

    if (!fileId || !Array.isArray(indices)) {
      res.status(400).json({ err: "file or pages not selected!" });
      return;
    }

    const userFile = await File.findOne({ file_id: fileId });
    if (!userFile) {
      res.status(400).json({ err: "user file not found" });
      return;
    }

    const newDoc = await extractPages(userFile.filename!, indices);
    const newFilename = `${uuid()}-extracted.pdf`;
    fs.writeFileSync(`uploads/${newFilename}`, newDoc);

    const newFile = new File({
      user_id: userId,
      file_id: uuid(),
      filename: newFilename,
    });
    await newFile.save();
    res
      .status(200)
      .json({ msg: "pages has been extracted!", fileId: newFile.file_id });
  } catch (error) {
    console.log(error);
    res.status(5000).json({ err: "Internal Server Error!" });
  }
};

export const removePDFPages = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user["user_id"];
    const { fileId, indices } = req.body;

    if (!fileId || !Array.isArray(indices)) {
      res.status(400).json({ err: "file or pages not selected!" });
      return;
    }

    const userFile = await File.findOne({ file_id: fileId });
    if (!userFile) {
      res.status(400).json({ err: "user file not found" });
      return;
    }

    const newDoc = await removePages(userFile.filename!, indices);
    const newFilename = `${uuid()}-removed.pdf`;
    fs.writeFileSync(`uploads/${newFilename}`, newDoc);

    const newFile = new File({
      user_id: userId,
      file_id: uuid(),
      filename: newFilename,
    });
    await newFile.save();
    res
      .status(200)
      .json({ msg: "pages has been removed!", fileId: newFile.file_id });
  } catch (error) {
    console.log(error);
    res.status(5000).json({ err: "Internal Server Error!" });
  }
};

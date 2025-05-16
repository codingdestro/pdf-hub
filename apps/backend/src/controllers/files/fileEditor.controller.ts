import type { Request, Response } from "express";
import fs from "node:fs";
import { v4 as uuid } from "uuid";
import { mergePdf } from "../../utils/fileHandler";
import File from "../../models/files.model";

export const mergePDF = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user["userId"];
    const { fileIds } = req.body;

    if (!fileIds || !Array.isArray(fileIds)) {
      res.status(400).json({ err: "files not selected" });
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

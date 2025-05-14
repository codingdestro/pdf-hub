import { PDFDocument } from "pdf-lib";
import fs from "node:fs";
import { indexOfLine } from "bun";

export const mergePdf = async (files: string[]): Promise<Uint8Array> => {
  if (files.length < 2) {
    throw new Error("Given files should be at least 2");
  }

  const newPDF = await PDFDocument.create();
  for (let i = 0; i < files.length; i++) {
    const currentFile = files[i];
    const documentPdf = fs.readFileSync(currentFile!);
    const pdfDoc = await PDFDocument.load(documentPdf);
    for (let idx = 0; idx < pdfDoc.getPageCount(); idx += 1) {
      const [page] = await newPDF.copyPages(pdfDoc, [idx]);
      newPDF.addPage(page);
    }
  }

  const pdfBytes = await newPDF.save();
  return pdfBytes;
};

export const extractPages = async (
  filename: string,
  indices: number[]
): Promise<Uint8Array> => {
  if (indices.length == 0) throw new Error("there should be at least indices");

  const fileBuffer = fs.readFileSync(filename);
  const doc = await PDFDocument.load(fileBuffer);

  const newDoc = await PDFDocument.create();
  for (let i = 0; i < indices.length; i++) {
    const [page] = await newDoc.copyPages(doc, [indices[i]! - 1]);
    newDoc.addPage(page);
  }
  const pdfBytes = await newDoc.save();
  return pdfBytes;
};

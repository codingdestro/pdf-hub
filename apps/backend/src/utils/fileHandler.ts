import { PDFDocument } from "pdf-lib";
import fs from "node:fs";

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

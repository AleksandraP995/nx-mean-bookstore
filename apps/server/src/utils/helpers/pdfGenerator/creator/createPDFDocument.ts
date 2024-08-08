import { PDFDocument } from 'pdf-lib';

export const createPDFDocument = async (text: string): Promise<Uint8Array> => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 400]);
  page.drawText(text);
  return await pdfDoc.save();
};

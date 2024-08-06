
import path from 'path';
import { ensureOutputDirectory } from '../pdfGenerator/ensureOutputDirectory';
import { createPDFDocument } from '../pdfGenerator/createPDFDocument';
import { savePDFPathToDatabase } from '../pdfGenerator/savePDFToDatabase';
import { simulateLongRunningTask } from '../pdfGenerator/simulateLongRunningTaks';
import { writePDFToFile } from '../pdfGenerator/writePDFToFile';

export const generatePDF = async (
  text: string,
  userId: string,
  progressCallback: (progress: number) => void
): Promise<string> => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const outputPath = path.join(__dirname, '../../output');
      await ensureOutputDirectory(outputPath);
      await simulateLongRunningTask(progressCallback);
      const pdfBytes = await createPDFDocument(text);
      const pdfPath = `${outputPath}/${Date.now()}.pdf`;
      await writePDFToFile(pdfBytes, pdfPath);
      await savePDFPathToDatabase(userId, pdfPath);
      resolve(pdfPath);
    } catch (error) {
      reject(error);
    }
  });
};

export default generatePDF;


import path from 'path';
import { ensureOutputDirectory } from './creator/ensureOutputDirectory';
import { createPDFDocument } from './creator/createPDFDocument';
import { savePDFPathToDatabase } from './database/savePDFToDatabase';
import { simulateLongRunningTask } from './simulator/simulateLongRunningTaks';
import { writePDFToFile } from './creator/writePDFToFile';

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

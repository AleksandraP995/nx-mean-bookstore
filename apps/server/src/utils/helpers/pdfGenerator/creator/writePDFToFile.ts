
import fs from 'fs/promises';

export const writePDFToFile = async (pdfBytes: Uint8Array, pdfPath: string): Promise<void> => {
  try {
    await fs.writeFile(pdfPath, pdfBytes);
    console.log('PDF written to file');
  } catch (error) {
    console.error('Error writing PDF to file', error);
    throw error;
  }
};
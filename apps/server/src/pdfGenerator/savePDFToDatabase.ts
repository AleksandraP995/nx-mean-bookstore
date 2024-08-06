import client from '../postgre/postgreClient';

export const savePDFPathToDatabase = async (userId: string, pdfPath: string): Promise<void> => {
  try {
    const query = 'INSERT INTO pdfs(user_id, file_path) VALUES($1, $2) RETURNING id';
    const values = [userId, pdfPath];
    await client.query(query, values);
    console.log('PDF path saved to database');
  } catch (error) {
    console.error('Error saving PDF path to database', error);
    throw error;
  }
};

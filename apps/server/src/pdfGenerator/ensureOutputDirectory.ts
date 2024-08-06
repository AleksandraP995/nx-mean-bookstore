import fs from 'fs/promises'

export const ensureOutputDirectory = async (outputPath: string): Promise<void> => {
  try {
    await fs.mkdir(outputPath, { recursive: true });
    console.log('Output directory created or already exists');
  } catch (error) {
    console.error('Error creating output directory', error);
    throw error;
  }
};
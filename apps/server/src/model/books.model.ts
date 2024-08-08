import axios from 'axios';
import { BookItem } from '@org-bookstore/app-configuration';

export const retrieveAllBooks = async (
  q: string,
  maxResults: string,
  startIndex: number
): Promise<BookItem[]> => {
  const response = await axios.get(process.env.GOOGLE_BOOKS_API_URL, {
    params: {
      q,
      maxResults,
      startIndex,
      key: process.env.GOOGLE_BOOKS_API_KEY,
    },
  });
  return response.data;
};

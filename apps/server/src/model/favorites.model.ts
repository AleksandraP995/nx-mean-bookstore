import client from '../services/database/postgres.client';
import { FavoriteBook } from '@org-bookstore/app-configuration';

export const checkFavoriteExists = async (userId: string, bookId: string): Promise<boolean> => {
  const query = 'SELECT * FROM favorites WHERE user_id = $1 AND book_id = $2';
  const result = await client.query(query, [userId, bookId]);
  return result.rows.length > 0;
};

export const addBookToFavorites = async (userId: string, bookId: string): Promise<FavoriteBook> => {
  const query = 'INSERT INTO favorites (user_id, book_id) VALUES ($1, $2) RETURNING *';
  const result = await client.query(query, [userId, bookId]);
  return result.rows[0];
};

export const deleteBookFromFavorites = async(userId: string, bookId: string): Promise<number> => {
    const query = 'DELETE FROM favorites WHERE book_id = $1 AND user_id = $2';
    const result = await client.query(
        query,
        [bookId, userId]
      );
    return result.rowCount;
}
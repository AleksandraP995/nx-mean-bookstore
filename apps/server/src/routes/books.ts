import express, { Request, Response } from 'express';
import client from '../postgre/postgreClient';
import { AddBookToFavoritesObject } from '../../models/httpResponse';

const router = express.Router();

router.post('/add-book', async (req, res) => {
  const { bookId, userId } = req.body;

  try {
    // provera da li on vec postoji u bazi prvo, ali to ne moze preko UI-ja da se desi
    const checkFavoritesQuery =
      'SELECT * FROM favorites WHERE user_id = $1 AND book_id = $2';
    const checkResult = await client.query(checkFavoritesQuery, [
      userId,
      bookId,
    ]);
    if (checkResult.rows.length > 0) {
      return res
        .status(409)
        .json({ message: 'Book already exists in favorites' });
    }

    const addBookToFavoritesQuery =
      'INSERT INTO favorites (user_id, book_id) VALUES ($1, $2) RETURNING *';
      
    const result = await client.query(addBookToFavoritesQuery, [
      userId,
      bookId,
    ]);

    const addedFavorite: AddBookToFavoritesObject = result.rows[0];
    res.status(201).json(addedFavorite);
  } catch (error) {
    console.error('Error adding to favorites:', error);
    res.status(500).send('Server error');
  }
});

router.delete('/remove-book', async (req, res) => {
  const { bookId, userId } = req.body;

  try {
    const result = await client.query(
      'DELETE FROM favorites WHERE book_id = $1 AND user_id = $2',
      [bookId, userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Book not found in favorites' });
    }

    res.status(200).json({ message: 'Book removed from favorites' });
  } catch (error) {
    console.error('Error removing book from favorites', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;

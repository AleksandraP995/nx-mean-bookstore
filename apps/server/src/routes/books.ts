/* eslint-disable @nx/enforce-module-boundaries */
import express from 'express';
import * as admin from 'firebase-admin';
import client from '../postgre/postgreClient';
import axios from 'axios';
import { BookItem, FavoriteBook } from '@org-bookstore/app-configuration';
import { validateBookUserId, validateQueries } from '../middlewares/validateRequest.middleware';
const router = express.Router();

router.get('/google-books', validateQueries, async (req, res) => {
  const { q, maxResults, startIndex } = req.query;
  try {
    const response = await axios.get(process.env.GOOGLE_BOOKS_API_URL, {
      params: {
        q,
        maxResults,
        startIndex,
        key: process.env.GOOGLE_BOOKS_API_KEY,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});

router.post('/save-shopping-list', async (req, res) => {
  const shoppingList: BookItem[] = req.body;
  try {
    const db = admin.database();
    const ref = db.ref('books');
    await ref.push(shoppingList);
    res.status(200).send('Shopping list saved successfuly')
  } catch(err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Error fetching data');
  }
})

router.post('/add-book', validateBookUserId, async (req, res) => {
  const { bookId, userId } = req.body;

  try {
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

    const addedFavorite: FavoriteBook = result.rows[0];
    res.status(201).json(addedFavorite);
  } catch (error) {
    console.error('Error adding to favorites:', error);
    res.status(500).send('Server error');
  }
});

router.delete('/remove-book', validateBookUserId, async (req, res) => {
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

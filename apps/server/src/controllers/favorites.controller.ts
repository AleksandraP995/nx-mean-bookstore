import { Request, Response } from 'express';
import {
  checkFavoriteExists,
  addBookToFavorites,
  deleteBookFromFavorites,
} from '../model/favorites.model';
import { BookItem, FavoriteBook } from '@org-bookstore/app-configuration';
import * as admin from 'firebase-admin';

const addBookToFavoritesController = async (req: Request, res: Response) => {
  const { bookId, userId } = req.body;
  try {
    const exists = await checkFavoriteExists(userId, bookId);
    if (exists) {
      return res
        .status(409)
        .json({ message: 'Book already exists in favorites' });
    }
    const addedFavorite: FavoriteBook = await addBookToFavorites(
      userId,
      bookId
    );
    res.status(201).json(addedFavorite);
  } catch (error) {
    console.error('Error adding to favorites:', error);
    res.status(500).send('Server error');
  }
};

const removeBookFromFavoritesController = async (
  req: Request,
  res: Response
) => {
  const { bookId, userId } = req.body;
  try {
    const noOfBooks = await deleteBookFromFavorites(bookId, userId);
    if (noOfBooks == 0) {
      return res.status(404).json({ message: 'Book not found in favorites' });
    }
    res.status(200).json({ message: 'Book removed from favorites' });
  } catch (error) {
    console.error('Error removing book from favorites', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const createFavoritesListController = async (req: Request, res: Response) => {
  const shoppingList: BookItem[] = req.body;
  try {
    const db = admin.database();
    const ref = db.ref('books');
    await ref.push(shoppingList);
    res.status(200).send('Shopping list saved successfuly');
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Error fetching data');
  }
};

export { addBookToFavoritesController, removeBookFromFavoritesController, createFavoritesListController };

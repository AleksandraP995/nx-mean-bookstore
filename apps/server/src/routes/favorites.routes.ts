/* eslint-disable @nx/enforce-module-boundaries */
import express from 'express';
import { validateBookUserId, validateQueries } from '../middlewares/validateRequest.middleware';
import { addBookToFavoritesController, createFavoritesListController, removeBookFromFavoritesController } from '../controllers/favorites.controller';
import { retrieveAllBooksController } from '../controllers/books.controller';

const router = express.Router();

router.get('/google-books', validateQueries, retrieveAllBooksController);
router.post('/save-shopping-list', createFavoritesListController)
router.post('/add-book', validateBookUserId, addBookToFavoritesController);
router.delete('/remove-book', validateBookUserId, removeBookFromFavoritesController);

export default router;

import { Injectable } from '@angular/core';
import { bookUserIdSchema, googleBooksApiQueriesSchema } from '@org-bookstore/app-configuration';
import * as Joi from 'joi';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  validateBookAndUser(bookId: string, userId: string): Joi.ValidationResult {
    return bookUserIdSchema.validate({ bookId, userId });
  }

  validateGoogleBooksQueries(query: string, maxResults: number, startIndex: number): Joi.ValidationResult {
    return googleBooksApiQueriesSchema.validate({ query, maxResults, startIndex});
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BooksVolume } from '../../models/booksVolume';
import { catchError, exhaustMap, map, take, tap } from 'rxjs/operators';
import { BehaviorSubject, ObservableInput, throwError } from 'rxjs';
import { bookForDisplay } from '../../models/bookItem/bookItem';
import { environment } from '../../environments/environment';
import { AuthService } from '../authService/auth.service';
import { BookItem, BookstoreUser } from '@org-bookstore/app-configuration';
import { ValidationService } from '../validationService/validation.service';

@Injectable({
  providedIn: 'root',
})
export class BookStoreService {
  constructor(
    protected http: HttpClient,
    private readonly authService: AuthService,
    private validationService: ValidationService
  ) {}

  private booksSubject = new BehaviorSubject<BookItem[]>([]);
  get booksObservable$() {
    return this.booksSubject.asObservable();
  }

  newUser: BookstoreUser | null = null;
  volumeObject: BooksVolume | null = null;

  retrievedBannerBooks: BookItem[] = [];
  retrievedBannerBook: BookItem = bookForDisplay;

  retrieveBookForBanner() {
    return this.http
      .get<BooksVolume>(
        `${environment.settings.googleBooksApiUrl}/volumes?q=Oh%2C%20Canada!:keyes`
      )
      .pipe(tap((booksObject) => (this.volumeObject = booksObject)));
  }

  searchBooks(query: string, maxResults: number, startIndex: number): void {
    const { error } = this.validationService.validateGoogleBooksQueries(
      query,
      maxResults,
      startIndex
    );
    if (error) {
      console.error('Validation error ', error.details);
      throw new Error('Validation failed');
    }
    const params = new HttpParams()
      .set('q', query)
      .set('maxResults', maxResults)
      .set('startIndex', startIndex);

    const url = `${environment.settings.apiUrl}/favorites/google-books`;

    this.authService.userObservable$
      .pipe(
        take(1),
        exhaustMap(() => {
          return this.http.get<BooksVolume>(url, { params });
        }),
        catchError(this.handleError),
        map((booksVolume: BooksVolume) => {
          return booksVolume.items || [];
        })
      )
      .subscribe({
        next: (books: BookItem[]) => this.booksSubject.next(books),
        error: (err) => console.error('Failed to fetch books', err),
      });
  }

  private handleError(error: ObservableInput<string>) {
    console.error('An error occurred', error);
    return throwError(() => new Error('Failed to fetch books'));
  }
}

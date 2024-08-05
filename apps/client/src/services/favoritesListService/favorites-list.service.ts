import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BookItem } from '../../models/bookItem/bookItem';
import { BookstoreUser } from '../../models/user';
import { NotificationManagerService } from '../notificationManager/notification-manager.service';
import { environment } from '../../environments/environment';
import { AddBookToFavoritesObject } from '@org-bookstore/app-configuration';

@Injectable({
  providedIn: 'root',
})
export class FavoritesListService {
  constructor(
    private http: HttpClient,
    private notificationManager: NotificationManagerService
  ) {
    window.addEventListener('beforeunload', () => this.saveFavoritesState());
  }

  private favoritesStateKey = 'favoritesState';

  isFoundInFavorites = false;
  favoritesList: BookItem[] = this.loadFavoritesState();

  private isFavoriteSubject = new BehaviorSubject<boolean>(false);
  get isFavoriteObservable$() {
    return this.isFavoriteSubject.asObservable();
  }

  saveFavoritesState() {
    localStorage.setItem(
      this.favoritesStateKey,
      JSON.stringify(this.favoritesList)
    );
  }

  saveBookToFavoritesDB(bookId: string, userId: string): Observable<HttpResponse<AddBookToFavoritesObject>> {
    return this.http.post<AddBookToFavoritesObject>(`${environment.settings.apiUrl}/favorites/add-book`, { bookId, userId }, 
      // kako bi observovao ceo response, sa statusom, bodijem itd i da ne bude greska 
      { observe: 'response' });
  }

  removeBookFromFavoritesDB(bookId: string, userId: string) {
    return this.http.delete(`${environment.settings.apiUrl}/favorites/remove-book`, { body: {bookId, userId } })
  }

  private loadFavoritesState(): BookItem[] {
    const savedState = localStorage.getItem(this.favoritesStateKey);
    return savedState ? JSON.parse(savedState) : [];
  }

  resetFavoritesList(): void {
    this.favoritesList = [];
    this.saveFavoritesState();
  }

  toggleFavoriteCheck(isFavorite: boolean) {
    this.isFavoriteSubject.next(isFavorite);
  }


  addToFavorites(item: BookItem, currentUser: BookstoreUser | null) {
    this.favoritesList.push(item);
    this.saveFavoritesState();
    if (!currentUser) {  
      this.notificationManager.openSnackBar('User has to be signed in');
      return;
    }
    this.saveBookToFavoritesDB(item.id, currentUser?.id).subscribe({
      next: (response: HttpResponse<AddBookToFavoritesObject>) => {
        if(response.status == 409) {
          this.notificationManager.openSnackBar(`Book ${item.volumeInfo.title} is already in favorites`);
          return;
        }
        console.log(`Book ${item.volumeInfo.title} added to favorites`, response);
        this.notificationManager.openSnackBar(`Book ${item.volumeInfo.title} added to favorites`);
      },
      error: (error) => {
        console.error(`Error adding book ${item.volumeInfo.title} to favorites`, error);
        this.notificationManager.openSnackBar('Oops there was a mistake');
      },
      complete: () => {
        console.log('Request complete');
      }
    });
  }


  removeFromFavorites(book: BookItem, currentUser: BookstoreUser | null) {
    this.favoritesList = this.favoritesList.filter((book) => book.id !== book.id);
    this.saveFavoritesState();
    if (!currentUser) {  
      this.notificationManager.openSnackBar('User has to be signed in');
      return;
    }
    this.removeBookFromFavoritesDB(book.id, currentUser?.id).subscribe({
      next: (response) => {
        console.log(`Book ${book.volumeInfo.title} removed from favorites`, response);
        this.notificationManager.openSnackBar(`Book ${book.volumeInfo.title} removed from favorites`);
      },
      error: (error) => {
        console.error(`Error removing book ${book.volumeInfo.title} from favorites`, error);
        this.notificationManager.openSnackBar('Oops there was a mistake');
      },
      complete: () => {
        console.log('Request complete');
      }
    })
  }

  toggleFavorite(book: BookItem, currentUser: BookstoreUser | null) {
    this.isFoundInFavorites = this.favoritesList.some(
      (fav) => fav.id == book.id
    );
    this.toggleFavoriteCheck(this.isFoundInFavorites);
    if (!this.isFoundInFavorites) {
      this.addToFavorites(book, currentUser);
      return;
    }
    this.removeFromFavorites(book, currentUser);
  }

  checkIfInFavorites(book: BookItem) {
    this.isFoundInFavorites = this.favoritesList.some(
      (fav) => fav.id == book.id
    );
    return this.isFoundInFavorites;
  }
}

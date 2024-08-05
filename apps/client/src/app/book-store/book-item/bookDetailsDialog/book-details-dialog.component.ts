import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ShoppingCartService } from '../../../../services/shoppingCartService/shopping-cart.service';
import { FavoritesListService } from '../../../../services/favoritesListService/favorites-list.service';
import { BookItem, bookForDisplay} from '../../../../models/bookItem/bookItem';
import { Subscription } from 'rxjs';
import { BookstoreUser } from '../../../../models/user';
import { AuthService } from '../../../../services/authService/auth.service';

@Component({
  selector: 'app-book-details-dialog',
  templateUrl: './book-details-dialog.component.html',
  styleUrls: ['./book-details-dialog.component.scss']
})
export class BookDetailsDialogComponent implements OnInit {
  book: BookItem = bookForDisplay;
  fullDescription = this.book?.volumeInfo.description || '';

  userSubscription = new Subscription();
  currentUser: BookstoreUser | null = null;
  

  constructor(
    public dialogRef: MatDialogRef<BookDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public shoppingService: ShoppingCartService,
    public favoritesService: FavoritesListService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // proveri
    this.data = this.book;
    this.favoritesService.isFavoriteObservable$.subscribe(isFavorite => {
      this.favoritesService.isFoundInFavorites = isFavorite;
    });
    this.userSubscription = this.authService.userObservable$.subscribe(
      (user) => {
        this.currentUser = user ? user : null;
      }
    );
  }

  addBookToShoppingList() {
    this.shoppingService.toggleShoppingList(this.book, this.currentUser);
  }

  addBookToFavoritesList() {
    this.favoritesService.toggleFavorite(this.book, this.currentUser);
  }

  onClose(): void {
    this.dialogRef.close();
  }

}


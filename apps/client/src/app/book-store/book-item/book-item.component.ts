import { Component, Input, OnInit } from '@angular/core';
import { bookForDisplay } from '../../../models/bookItem/bookItem';
import { MatDialog } from '@angular/material/dialog';
import { BookDetailsDialogComponent } from './bookDetailsDialog/book-details-dialog.component';
import { ShoppingCartService } from '../../../services/shoppingCartService/shopping-cart.service';
import { FavoritesListService } from '../../../services/favoritesListService/favorites-list.service';
import { getCssCustomProperty } from '../../../shared/utils';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/authService/auth.service';
import { BookItem, BookstoreUser } from '@org-bookstore/app-configuration';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.scss'],
})
export class BookItemComponent implements OnInit {
  @Input() book: BookItem = bookForDisplay;

  author = this.book.volumeInfo?.authors[0] || 'Samuel Bekett';
  showIcons: boolean = false;

  userSubscription = new Subscription();
  currentUser: BookstoreUser | null = null;
  
  constructor(
    private readonly shoppingService: ShoppingCartService,
    private readonly favoritesService: FavoritesListService,
    private readonly authService: AuthService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.favoritesService.isFavoriteObservable$.subscribe((isFavorite) => {
      this.favoritesService.isFoundInFavorites = isFavorite;
    });
    this.userSubscription = this.authService.userObservable$.subscribe(
      (user) => {
        this.currentUser = user ? user : null;
      }
    );
  }
  checkIfInFavorites(book: BookItem): boolean {
    return this.favoritesService.checkIfInFavorites(book)
  }

  toggleFavorite(book: BookItem) {
    this.favoritesService.toggleFavorite(book, this.currentUser);
  }

  get favoritesList() {
    return this.favoritesService.favoritesList;
  }

  openDialog(): void {
    const dialogWidth = getCssCustomProperty('--book-item-dialog-width');
    const dialogHeight = getCssCustomProperty('--book-item-dialog-height');

    const dialogRef = this.dialog.open(BookDetailsDialogComponent, {
      width: dialogWidth,
      height: dialogHeight,
      data: this.book,
      panelClass: 'custom-dialog-styling',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  addBookToShoppingCart() {
    this.shoppingService.toggleShoppingList(this.book, this.currentUser)
  }
}

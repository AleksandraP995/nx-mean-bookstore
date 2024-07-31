import { Component, Input, OnInit } from '@angular/core';
import { bookForDisplay } from '../../../models/bookItem/bookItem';
import { MatDialog } from '@angular/material/dialog';
import { BookDetailsDialogComponent } from './book-details-dialog/book-details-dialog.component';
import { ShoppingCartService } from '../../../services/shopping-cart-service/shopping-cart.service';
import { FavoritesListService } from '../../../services/favorites-list-service/favorites-list.service';
import { getCssCustomProperty } from '../../../shared/utils';
import { BookItem } from '../../../models/bookItem/bookItem';
import { BookstoreUser } from '../../../models/user';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth-service/auth.service';

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
    debugger;
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
    debugger
    this.shoppingService.toggleShoppingList(this.book, this.currentUser)
  }
}

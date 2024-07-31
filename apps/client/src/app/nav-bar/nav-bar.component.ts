import { Component, OnInit } from '@angular/core';
import { BookStoreService } from '../../services/book-store-service/book-store.service';
import { FormControl } from '@angular/forms';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs/operators';
import { Common } from '../../shared/shopping-list-enums';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ShoppingStepperComponent } from '../shoppin-list/shopping-stepper/shopping-stepper.component';
import { ShoppingCartService } from '../../services/shopping-cart-service/shopping-cart.service';
import { FavoritesListService } from '../../services/favorites-list-service/favorites-list.service';
import { AuthService } from '../../services/auth-service/auth.service';
import { BookstoreUser } from '../../models/user';
import { getCssCustomProperty } from '../../shared/utils';
import { NotificationManagerService } from '../../services/notification-manager/notification-manager.service';
import { ShoppingDialogData } from '../../models/shoppingCart/shoppingDialogData';
import { Subscription } from 'rxjs';
import { BookItem } from '../../models/bookItem/bookItem';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  query: FormControl = new FormControl();
  loading: boolean = false;
  isAuthenticated: boolean = false;

  newUser: BookstoreUser | null = null;

  userSubscription: Subscription = new Subscription();
  userResetSubscription:Subscription = new Subscription();
  shoppingListSubscription: Subscription = new Subscription();

  userName: string = '';
  firstLetter: string = '';
  showUserPopup: boolean = false;
  isAdminLoggedIn: boolean = false;
  shoppingList: BookItem[] = [];
  totalPriceSummary: number = 0;
  discountCode: string = '';

  openUserPopup() {
    this.showUserPopup = !this.showUserPopup;
  }

  constructor(
    public bookStoreService: BookStoreService,
    public shoppingService: ShoppingCartService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    public favoritesService: FavoritesListService,
    private notificationManager: NotificationManagerService
  ) {}

  ngOnInit(): void {
    this.searchBooks();
    this.userSubscription = this.authService.userObservable$
      .subscribe((user) => {
        if (!user) {
          return;
        }
        this.isAuthenticated = !!user?.email;
        this.newUser = user;
        this.userName = user.username ?? '';
        this.firstLetter = this.getFirstLetterUppercase(this.userName);
        this.notificationManager.openSnackBar(`Welcome ${this.userName}`);
      });
    
    this.userResetSubscription = this.authService.resetSubjectObservable$.subscribe(reset => {
      if(reset) {
          this.shoppingService.resetShoppingList();
          this.favoritesService.resetFavoritesList();
          this.notificationManager.openSnackBar(`Welcome ${this.newUser?.username}`);
      }
    });

    this.shoppingListSubscription = 
      this.shoppingService.shoppingStateObservable$.subscribe(
        (shoppingState) => {
          this.shoppingList = shoppingState.shoppingList;
          this.totalPriceSummary = shoppingState.totalPriceSummary;
          this.discountCode = shoppingState.discountCode;
        }
      );
    this.isAdminLoggedIn = this.newUser?.isAdmin ?? false;
  }

  navigateToFavorites() {
    this.router.navigate(['/favorites']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToUsers() {
    this.router.navigate(['/users']);
  }

  searchBooks() {
    this.query.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        catchError((error) => {
          console.error('Failed to search for books' + error);
          return '';
        })
      )
      .subscribe((query: string) => {
        console.log('Query: ' + query);
        const trimmedQuery =
          query == '' ? Common.defaultQueryValue : query.trim();
        this.bookStoreService.searchBooks(trimmedQuery, Common.maxResult, 1);
      });
  }

  openShoppingDialog(): void {
    const dataToPass: ShoppingDialogData = {
      shoppingList: this.shoppingList,
      totalPriceSummary: this.totalPriceSummary,
      discountCode: this.discountCode,
    };
    const dialogWidth = getCssCustomProperty('--shopping-cart-dialog-width');
    const dialogHeight = getCssCustomProperty('--shopping-cart-dialog-height');

    const dialogRef = this.dialog.open(ShoppingStepperComponent, {
      width: dialogWidth,
      height: dialogHeight,
      data: dataToPass,
      panelClass: 'custom-shopping-cart-dialog-styling',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed' + result);
    });
  }

  private getFirstLetterUppercase(username: string): string {
    if (!username) return '';
    return username.charAt(0).toUpperCase();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.shoppingListSubscription.unsubscribe();
  }
}

// this.userSubscription = this.authService.userObservable$
//       .pipe(startWith(null), pairwise())
//       .subscribe(([previousUser, currentUser]) => {
//         if (!currentUser) {
//           return;
//         }
//         debugger;
//         if (previousUser && previousUser.email !== currentUser?.email) {
//           this.shoppingService.resetShoppingList();
//           this.favoritesService.resetFavoritesList();
//           // this.notificationManager.openSnackBar(`Welcome ${user?.username}`);
//         }
//         this.isAuthenticated = !!currentUser?.email;
//         this.newUser = currentUser;
//         this.userName = currentUser.username ?? '';
//         this.firstLetter = this.getFirstLetterUppercase(this.userName);
//         this.notificationManager.openSnackBar(`Welcome ${this.userName}`);
//         this.previousUser = this.newUser;
//       });
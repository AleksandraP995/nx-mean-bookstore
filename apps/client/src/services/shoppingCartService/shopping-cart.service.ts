import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NotificationManagerService } from '../notificationManager/notification-manager.service';
import {
  ShoppingState,
  TotalPricePerBook,
} from '../../models/shoppingCart/shoppingState';
import { BookItem } from '../../models/bookItem/bookItem';
import { BookstoreUser } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(
    private http: HttpClient,
    private notificationManager: NotificationManagerService
  ) {
    window.addEventListener('beforeunload', () => this.saveShoppingState());
  }
  private shoppingStateKey = 'shoppingState';

  private initialShoppingState = {
    shoppingList: [],
    discountCode: '',
    isBought: false,
    totalPrice: { bookId: '', bookPrice: 0 },
    totalPriceSummary: 0,
  }
  private shoppingStateSubject = new BehaviorSubject<ShoppingState>(
    this.loadShoppingState()
  );
  //to subscribe to changes
  get shoppingStateObservable$() {
    return this.shoppingStateSubject.asObservable();
  }

  private loadShoppingState(): ShoppingState {
    const savedState = localStorage.getItem(this.shoppingStateKey);
    return savedState ? JSON.parse(savedState) : this.initialShoppingState;
  }

  private saveShoppingState(): void {
    const currentState = this.shoppingStateSubject.value;
    localStorage.setItem(this.shoppingStateKey, JSON.stringify(currentState));
  }

  resetShoppingList(): void {
    const currentState = this.shoppingStateSubject.getValue();
    this.shoppingStateSubject.next({ ...currentState, shoppingList: [] });
    this.saveShoppingState();
  }

  saveBookToDB(bookId: number, userId: number) {
    // return this.http.post('/api/add-book', { bookId, userId });
  }

  addToShoppingList(item: BookItem, currentUser: BookstoreUser | null) {
    const currentState = this.shoppingStateSubject.value;
    const updatedList = [...currentState.shoppingList, item];
    this.shoppingStateSubject.next({ ...currentState, shoppingList: updatedList });
    this.saveShoppingState();
    this.saveBookToDB(+item?.id, +!currentUser?.id)
    this.notificationManager.openSnackBar('Book added to the cart');
  }

  removeFromShoppingList(id: string) {
    const currentState = this.shoppingStateSubject.value;
    const updatedList = currentState.shoppingList.filter(book => book.id !== id);
    this.shoppingStateSubject.next({ ...currentState, shoppingList: updatedList });
    this.saveShoppingState();
    this.notificationManager.openSnackBar('Book removed from the cart');
  }

  toggleShoppingList(book: BookItem, currentUser: BookstoreUser | null) {
    const currentList = this.shoppingStateSubject.value.shoppingList;
    const isBought = currentList.some((bought) => bought.id == book.id);
    const currentState = this.shoppingStateSubject.getValue();
    this.shoppingStateSubject.next({ ...currentState, isBought });
    if (!isBought) {
      this.removeFromShoppingList(book.id);
      return;
    } 
    this.addToShoppingList(book, currentUser);
  }

  setDiscount(discountCode: string) {
    const currentState = this.shoppingStateSubject.getValue();
    this.shoppingStateSubject.next({ ...currentState, discountCode });
  }

  setTotalPrice(totalPrice: TotalPricePerBook) {
    const currentState = this.shoppingStateSubject.getValue();
    this.shoppingStateSubject.next({ ...currentState, totalPrice });
    this.saveShoppingState();
  }

  setTotalPriceSummary(totalPriceSummary: number) {
    const currentState = this.shoppingStateSubject.getValue();
    this.shoppingStateSubject.next({ ...currentState, totalPriceSummary });
    this.saveShoppingState();
  }

  saveShoppingList(shoppingList: BookItem[]) {
    const baseUrl = environment.settings.firebaseDBUrl;
    return this.http.post(`${baseUrl}/books.json`, shoppingList);
  }
}

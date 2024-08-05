import { Component, OnInit } from '@angular/core';
import { BookStoreService } from '../../services/bookStoreService/book-store.service';
import { BookQueryParams } from '../../models/shoppingListEnums';
import { Subscription } from 'rxjs';
import { BookstoreUser } from '../../models/user';
import { AuthService } from '../../services/authService/auth.service';

@Component({
  selector: 'app-book-store',
  templateUrl: './book-store.component.html',
  styleUrls: ['./book-store.component.scss'],
})
export class BookStoreComponent implements OnInit {
  query: string = 'all';
  maxResult: number = BookQueryParams.maxResult;
  startIndex: number = BookQueryParams.startIndex;
  currentPage = 1;
  totalItems: number = 500;
  newUser: BookstoreUser | null = null;
  isAuthenticated = false;
  userSubscription = new Subscription();

  constructor(
    public readonly bookStoreService: BookStoreService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getResults();
    this.userSubscription = this.authService.userObservable$.subscribe(
      (user) => {
        this.isAuthenticated = !!user;
        this.newUser = user ? user : null;
      }
    );
  }

  pageChanged(event: any) {
    this.currentPage = event;
    this.getResults();
  }

  getResults() {
    // this.query == '' && (this.query = 'all');
    this.bookStoreService.searchBooks(
      this.query,
      BookQueryParams.maxResult,
      this.currentPage
    );
  }

  onLinkNameChanged(newLinkName: string) {
    this.bookStoreService.searchBooks(
      newLinkName,
      BookQueryParams.maxResult,
      this.currentPage
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}

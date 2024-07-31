import { Component, OnInit } from '@angular/core';
import { BookStoreService } from '../../services/book-store-service/book-store.service';
import { Common } from '../../shared/shopping-list-enums';
import { Subscription } from 'rxjs';
import { BookstoreUser } from '../../models/user';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-book-store',
  templateUrl: './book-store.component.html',
  styleUrls: ['./book-store.component.scss'],
})
export class BookStoreComponent implements OnInit {
  query: string = 'all';
  maxResult: number = Common.maxResult;
  startIndex: number = Common.startIndex;
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
      Common.maxResult,
      this.currentPage
    );
  }

  onLinkNameChanged(newLinkName: string) {
    this.bookStoreService.searchBooks(
      newLinkName,
      Common.maxResult,
      this.currentPage
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}

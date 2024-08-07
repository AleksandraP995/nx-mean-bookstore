import { Component, OnInit } from '@angular/core';
import { bookForDisplay } from '../../../models/bookItem/bookItem';
import { BookStoreService } from '../../../services/bookStoreService/book-store.service';
import { NotificationManagerService } from '../../../services/notificationManager/notification-manager.service';
import { BookItem } from '@org-bookstore/app-configuration';

@Component({
  selector: 'app-banner-book',
  templateUrl: './banner-book.component.html',
  styleUrls: ['./banner-book.component.scss'],
})
export class BannerBookComponent implements OnInit {
  retrievedBannerBook: BookItem = bookForDisplay;

  constructor(
    private readonly bookStoreService: BookStoreService,
    private notificationManager: NotificationManagerService
  ) {}

  ngOnInit(): void {
    this.fetchBookForDisplay();
  }
  fetchBookForDisplay() {
    this.bookStoreService.retrieveBookForBanner().subscribe({
      next: (retrievedBook) => {
        this.retrievedBannerBook = retrievedBook.items[0];
      },
      error: (err) => {
        console.error(`Error occured: ${err}`),
        this.notificationManager.openSnackBar(
          `Nothing to show. Please add new books`
        );
      }
    });
  }
}

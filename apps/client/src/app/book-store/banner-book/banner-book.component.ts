import { Component, OnInit } from '@angular/core';
import { BookItem,bookForDisplay } from '../../../models/bookItem/bookItem';
import { BookStoreService } from '../../../services/book-store-service/book-store.service';
import { NotificationManagerService } from '../../../services/notification-manager/notification-manager.service';

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

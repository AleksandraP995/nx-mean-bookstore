/* eslint-disable no-debugger */
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { finalize, Subscription } from 'rxjs';
import { bookForDisplay, BookItem } from '../../../models/bookItem/bookItem';
import { ShoppingCartService } from '../../../services/shoppingCartService/shopping-cart.service';
import { TotalPricePerBook } from '../../../models/shoppingCart/shoppingState';
import { NotificationManagerService } from '../../..//services/notificationManager/notification-manager.service';
import { PdfService } from '../../../services/pdfGenerator/pdf.service';
import { AuthService } from '../../../services/authService/auth.service';
import { WebSocketMessage } from '../../../models/webSocketMessages';

@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.scss'],
})
export class ShoppingItemComponent implements OnInit {
  @Input() book: BookItem = bookForDisplay;
  @Input() quantity: number = 1;
  @Input() totalPricePerBook: number = 0;
  totalPriceSubscription!: Subscription;
  totalPrice: number = 0;
  price: number = 0;
  isInitialized: boolean = false;
  showDeleteButton: boolean = false;

  text: string = '';
  progress: number = 0;

  userId: string = '';
  userSubscription = new Subscription();

  constructor(
    private cdref: ChangeDetectorRef,
    private shoppingService: ShoppingCartService,
    private authService: AuthService,
    private pdfService: PdfService,
    private notificationManager: NotificationManagerService
  ) {}

  ngOnInit(): void {
    if (!this.isInitialized) {
      this.price = this.randomPrice();
      this.isInitialized = true;
    }
    this.totalPricePerBook =
      this.quantity == 1 ? this.price : this.totalPricePerBook;
    this.totalPrice =
      this.quantity == 1 ? this.totalPricePerBook : this.totalPrice;
    this.totalPriceSubscription = this.shoppingService.shoppingStateObservable$.subscribe(
      (shoppingState) => {
        this.totalPrice = shoppingState.totalPrice.bookPrice;
      }
    );
    const bookDetails: TotalPricePerBook = {
      bookId: this.book.id,
      bookPrice: this.totalPricePerBook
    }
    this.shoppingService.setTotalPrice(bookDetails);
    this.userSubscription = this.authService.userObservable$.subscribe(
      (user) => {
        this.userId = user ? user.id : '';
      }
    );
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  createPdf() {
    this.pdfService.createPdf(this.text, this.userId).pipe(finalize(() => this.notificationManager.openSnackBar('PDF Created'))).subscribe({
      next: () => {
        this.pdfService.connectWebSocket(this.userId).subscribe({
          next: (message: WebSocketMessage) => {
            console.log('Websocket message received ' + message)
          },
          error: (err) => console.error(err)
        })
      },
      error: (err) => console.error(err)
    });

    this.pdfService.getProgress().subscribe(progress => this.progress = progress);
  }

  randomPrice(): number {
    const min = Math.ceil(800);
    const max = Math.floor(2000);
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    const roundNumber = Math.round(randomNumber / 10) * 10;
    this.price = roundNumber;
    return roundNumber;
  }

  increment(event: Event, price: number, id: string) {
    event.stopPropagation();
    this.quantity++;
    this.totalPricePerBook += price;
    const bookDetails: TotalPricePerBook = {
      bookId: id,
      bookPrice: this.totalPricePerBook
    }
    this.shoppingService.setTotalPrice(bookDetails);
  }

  decrement(event: Event, price: number, id: string) {
    event.stopPropagation();
    if (this.quantity > 0) {
      this.quantity--;
      this.totalPricePerBook -= price;
      const bookDetails: TotalPricePerBook = {
        bookId: id,
        bookPrice: this.totalPricePerBook
      }
      this.shoppingService.setTotalPrice(bookDetails);
    }
  }

  removeBookFunction(event: Event, id: string) {
    event.stopPropagation();
    this.totalPrice = 0;
    const bookDetails: TotalPricePerBook = {
      bookId: id,
      bookPrice: this.totalPricePerBook
    }
    this.shoppingService.setTotalPrice(bookDetails);
    this.shoppingService.removeFromShoppingList(id);
  }

  ngOnDestroy() {
    this.totalPriceSubscription.unsubscribe();
  }
}

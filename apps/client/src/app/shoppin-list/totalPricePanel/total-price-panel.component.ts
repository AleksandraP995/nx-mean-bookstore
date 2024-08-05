import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { discountsList } from '../../../models/shoppingListEnums';
import { PricePerObject } from '../../../models/pricePerBook';
import { ShoppingCartService } from '../../../services/shoppingCartService/shopping-cart.service';

@Component({
  selector: 'app-total-price-panel',
  templateUrl: './total-price-panel.component.html',
  styleUrls: ['./total-price-panel.component.scss'],
})
export class TotalPricePanelComponent implements OnInit {
  discount: number = 0;
  taxes: number = 0;
  totalPrice: number = 0;
  totalPricePerBook: number = 0;
  shoppingStateSubscription: Subscription = new Subscription();
  isInitialized: boolean = false;
  totalPriceArray: PricePerObject[] = [];

  constructor(
    private shoppingService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    this.shoppingStateSubscription = this.shoppingService.shoppingStateObservable$.subscribe(
      (shoppingState) => {
        const foundObject = this.totalPriceArray.find(
          (book) => book.id == shoppingState.totalPrice.bookId
        );
        if(!foundObject) {
          this.totalPriceArray.push({
            id: shoppingState.totalPrice.bookId,
            price: shoppingState.totalPrice.bookPrice,
          });
        } else {
          foundObject.price = shoppingState.totalPrice.bookPrice
        }
        this.totalPrice = this.totalPriceArray.reduce(
          (acc, curr) => acc + curr.price,
          0
        );
        this.calculateTaxPrice();

        const discountCodePass = discountsList.get(shoppingState.discountCode);
        this.discount = discountCodePass
          ? (discountCodePass / 100) * this.totalPrice
          : 100;

        this.totalPrice = shoppingState.totalPriceSummary;
      }
    );
  }

  calculateTaxPrice() {
    this.taxes = +(this.totalPrice * 0.0725).toFixed(2);
    this.totalPrice += this.taxes;
    this.shoppingService.setTotalPriceSummary(this.totalPrice);
  }

  ngOnDestroy() {
    this.shoppingStateSubscription.unsubscribe();
  }
}

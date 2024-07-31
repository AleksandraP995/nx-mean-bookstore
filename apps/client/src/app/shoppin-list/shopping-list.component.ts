import { Component, Input, OnInit } from '@angular/core';
import { discountsList } from '../../shared/shopping-list-enums';
import { ShoppingCartService } from '../../services/shopping-cart-service/shopping-cart.service';
import { BookItem } from '../../models/bookItem/bookItem';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit {

  totalPricePerBook: number = 0;
  discountApplied: boolean = false;
  discountPercentage: number = 0;

  @Input() shoppingList: BookItem[] = [];
  @Input() totalPrice: number = 0;
  @Input() discountCode: string = '';

  constructor(
    private shoppingService: ShoppingCartService
  ) {}

  ngOnInit(): void {}

  applyDiscount(code: string) {
    if (discountsList.has(code)) {
      this.discountApplied = false;
    }
    this.discountPercentage = discountsList.get(code) ?? 0;
    this.totalPrice *= (100 - this.discountPercentage ?? 0) / 100;
    this.discountApplied = true;
    this.shoppingService.setTotalPriceSummary(this.totalPrice);
    this.discountCode = code;
  }

}

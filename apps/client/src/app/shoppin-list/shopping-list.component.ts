/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Input, OnInit } from '@angular/core';
import { discountsList } from '../../models/shoppingListEnums';
import { ShoppingCartService } from '../../services/shoppingCartService/shopping-cart.service';
import { BookItem } from '@org-bookstore/app-configuration';

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

  ngOnInit(): void { }

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

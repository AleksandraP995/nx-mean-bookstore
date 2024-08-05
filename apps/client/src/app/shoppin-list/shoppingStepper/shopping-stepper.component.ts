import { Component, Inject, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShoppingDialogData } from '../../../models/shoppingCart/shoppingDialogData';
import { BookItem } from '../../../models/bookItem/bookItem';

@Component({
  selector: 'app-shopping-stepper',
  templateUrl: './shopping-stepper.component.html',
  styleUrls: ['./shopping-stepper.component.scss'],
})
export class ShoppingStepperComponent implements OnInit {
  shoppingListSubscription: Subscription = new Subscription();

  constructor(@Inject(MAT_DIALOG_DATA) public dataToPass: ShoppingDialogData) {}

  ngOnInit(): void {}

  fetchShoppingList(shoppingList: BookItem[]) {
    console.log('To be done in the next step');
    // this.shoppingService.saveShoppingList(shoppingList).subscribe(respData => {
    //   console.log(respData);
    // })
  }

}

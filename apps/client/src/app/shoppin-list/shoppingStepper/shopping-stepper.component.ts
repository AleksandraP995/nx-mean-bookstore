/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShoppingDialogData } from '../../../models/shoppingCart/shoppingDialogData';
import { ShoppingCartService } from '../../../services/shoppingCartService/shopping-cart.service';
import { NotificationManagerService } from '../../../services/notificationManager/notification-manager.service';
import { BookItem } from '@org-bookstore/app-configuration';

@Component({
  selector: 'app-shopping-stepper',
  templateUrl: './shopping-stepper.component.html',
  styleUrls: ['./shopping-stepper.component.scss'],
})
export class ShoppingStepperComponent  {
  shoppingListSubscription: Subscription = new Subscription();

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataToPass: ShoppingDialogData,
    private shoppingService: ShoppingCartService,
    private notificationManager: NotificationManagerService
  ) {}

  fetchShoppingList(shoppingList: BookItem[]) {
    this.shoppingService
      .saveShoppingList(shoppingList)
      .subscribe({
        next: (message) => {
          console.log(message);
          this.notificationManager.openSnackBar(`${message}`)
        },
        error: (error) => console.error(error)
        
      });
  }
}
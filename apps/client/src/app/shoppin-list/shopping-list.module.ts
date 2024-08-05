import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingItemComponent } from './shoppingItem/shopping-item.component';
import { ShippingComponent } from './shipping/shipping.component';
import { DiscountCodeFormComponent } from './discountCodeForm/discount-code-form.component';
import { TotalPricePanelComponent } from './totalPricePanel/total-price-panel.component';
import { ShoppingStepperComponent } from './shoppingStepper/shopping-stepper.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../shared-module/shared.module';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingItemComponent,
    TotalPricePanelComponent,
    DiscountCodeFormComponent,
    ShoppingStepperComponent,
    ShippingComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatDialogModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    NgxPaginationModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatStepperModule,
    MatButtonModule,
    MatCardModule,
    SharedModule,
  ]
})
export class ShoppingListModule {}

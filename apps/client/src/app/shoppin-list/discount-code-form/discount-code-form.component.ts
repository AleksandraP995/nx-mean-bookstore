import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { discountsList } from '../../../shared/shopping-list-enums';
import { ShoppingCartService } from '../../../services/shopping-cart-service/shopping-cart.service';

@Component({
  selector: 'app-discount-code-form',
  templateUrl: './discount-code-form.component.html',
  styleUrls: ['./discount-code-form.component.scss'],
})
export class DiscountCodeFormComponent implements OnInit {
  discountCode: string = '';
  discountForm!: FormGroup;
  showInputField: boolean = false;
  couponCodeAlreadyUsed: boolean = false;
  discountCodeSubscription!: Subscription;
  tooltipMessage: string = 'Coupon code can be used only once';

  constructor(private shoppingService: ShoppingCartService) {}

  ngOnInit(): void {
    this.discountForm = new FormGroup({
      discountCode: new FormControl('', [this.discountCodeValidator()]),
    });
    this.discountCodeSubscription = this.shoppingService.shoppingStateObservable$.subscribe(
      (shoppingState) => {
        // this.discountCode = discountCode;
        this.discountForm?.get('discountCode')?.setValue(shoppingState.discountCode);
      }
    );

  }

  applyDiscount() {
    if (this.couponCodeAlreadyUsed) {
      this.showTooltip();
      return;
    }

    if (this.discountForm.valid) {
      this.discountCode = this.discountForm.get('discountCode')!.value;
      discountsList.has(this.discountCode)
        ? this.shoppingService.setDiscount(this.discountCode)
        : this.shoppingService.setDiscount('');
      this.couponCodeAlreadyUsed = true;
    }
  }

  showTooltip() {
    this.couponCodeAlreadyUsed = true;
    setTimeout(() => {
      this.couponCodeAlreadyUsed = false;
    }, 3000);
  }

  discountCodeValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      const value = control.value;

      return !/^[a-z]/.test(value)
        ? { invalidDiscountCode: true, lowercaseLetter: true }
        : !/\d/.test(value)
        ? { invalidDiscountCode: true, hasNumber: true }
        : value.length < 6
        ? { invalidDiscountCode: true, minLength: true }
        : null;
    };
  }
}

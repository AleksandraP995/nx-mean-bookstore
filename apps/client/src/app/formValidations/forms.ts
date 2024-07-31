import { FormControl, Validators } from '@angular/forms';
import { CustomValidators } from './customValidators';
import { Fields } from './enums';

export const loginForm = {
  email: new FormControl('', [Validators.required, Validators.email]),
  username: new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    CustomValidators.nameValidator,
  ]),
  password: new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    CustomValidators.passwordValidator,
  ]),
};

export const signupForm = {
  name: new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    CustomValidators.nameValidator,
  ]),
  username: new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    CustomValidators.nameValidator,
  ]),
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    CustomValidators.passwordValidator,
  ]),
  confirmPassword: new FormControl('', [Validators.required]),
};

export const discountCodeForm = {
  discountCode: new FormControl('', [CustomValidators.discountCodeValidator()]),
};

export const loginFormFields: string[] = [
  Fields.Username,
  Fields.Email,
  Fields.Password,
];
export const signupFormFields: string[] = [
  Fields.Name,
  Fields.Username,
  Fields.Email,
  Fields.Password,
  Fields.ConfirmPassword,
];
export const discountCodeFormFields: string[] = [
    Fields.DiscountCode
]

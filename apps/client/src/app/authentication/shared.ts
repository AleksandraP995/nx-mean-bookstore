import { FormControl, Validators } from '@angular/forms';
import { CustomValidators } from '../formValidations/customValidators';

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

export enum ValidationErrors {
  NameMinLength = 'Name must be at least 4 characters long.',
  NameUpperCase = 'Name must start with an uppercase letter',
  UsernameMinLength = 'Username must be at least 4 characters long.',
  UsernameUpperCase = 'Username must start with an uppercase letter',
  Required = 'This field is required',
  PasswordMinLength = 'Password must be at least 8 characters long.',
  PasswordInvalid = 'Password must contain at least one number, one uppercase letter and one symbol',
  EmailInvalid = 'Please enter a valid email address',
  PaswordMismatch = 'Passwords do not match',
  FormInvalid = 'Form invalid',
  SignInError = 'Sign-in error:',
  SignUpError = 'Sign-up error:',
  UnknownError = 'Sing in/up process is not successful',
}

export const errorMessages: { [field: string]: { [key: string]: string } } = {
  username: {
    required: ValidationErrors.Required,
    minlength: ValidationErrors.UsernameMinLength,
    invalidName: ValidationErrors.UsernameUpperCase,
  },
  password: {
    required: ValidationErrors.Required,
    minlength: ValidationErrors.PasswordMinLength,
    invalidPassword: ValidationErrors.PasswordInvalid,
  },
  email: {
    required: ValidationErrors.Required,
    email: ValidationErrors.EmailInvalid,
  },
  name: {
    required: ValidationErrors.Required,
    minlength: ValidationErrors.NameMinLength,
    invalidName: ValidationErrors.NameUpperCase,
  },
  confirmPassword: {
    passwordMismatch: ValidationErrors.PaswordMismatch,
  },
};

export enum Fields {
  Name = 'name',
  Username = 'username',
  Email = 'email',
  Password = 'password',
  ConfirmPassword = 'confirmPassword',
}

export const loginFormFields: string[] = [
    Fields.Username,
    Fields.Email,
    Fields.Password
]
export const signupFormFields: string[] = [
  Fields.Name,
  Fields.Username,
  Fields.Email,
  Fields.Password,
  Fields.ConfirmPassword,
];

export enum SubmitType {
  SignUp = 'SignUp',
  Login = 'Login'
}

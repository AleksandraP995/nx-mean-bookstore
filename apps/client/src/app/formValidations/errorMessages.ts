import { ValidationErrors } from "./enums";

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
    discountCode: {
      lowercaseLetter: ValidationErrors.DicountCodeLowercaseError,
      hasNumber: ValidationErrors.DicountCodeHasNumber,
      minLength: ValidationErrors.DicountCodeMinLength
    }
  };
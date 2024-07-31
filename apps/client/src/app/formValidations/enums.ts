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
    DicountCodeLowercaseError = 'Discount code must start with a lowercase letter',
    DicountCodeHasNumber = 'Discount code must contain at least one number',
    DicountCodeMinLength = 'Discount code must be at least 6 characters long',
    DicountCodeTooltipError = 'Coupon code can be used only once'
  }

  export enum Fields {
    Name = 'name',
    Username = 'username',
    Email = 'email',
    Password = 'password',
    ConfirmPassword = 'confirmPassword',
    DiscountCode = 'discountCode'
  }

  export enum SubmitType {
    SignUp = 'SignUp',
    Login = 'Login'
  }
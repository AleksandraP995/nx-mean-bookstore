export enum ExceptionErrors {
    UnknownError = 'Sing in/up process is not successful',
    EmailInUse = 'Email is already in use',
    EmailNotFound = 'Email not found',
    InvalidCredentials = 'Given credentials are invalid',
    InvalidPassword = 'The password is invalid or the user does not have a password',
    UserDisabled = 'The user account has been disabled by an administrator'
}

export enum ExceptionTypes {
    EmailInUse = 'EMAIL_EXISTS',
    InvalidCredentials = 'INVALID_LOGIN_CREDENTIALS',
    InvalidPassword = 'INVALID_PASSWORD',
    UserDisabled = 'USER_DISABLED'
}
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookstoreUser } from '../../../models/user';
import { AuthService } from '../../../services/authService/auth.service';
import { loginForm, loginFormFields } from '../../formValidations/forms';
import { Fields, ValidationErrors } from '../../../app/formValidations/enums';
import { UserCredentials } from '../../users/userEnums';
import { NotificationManagerService } from '../../../services/notificationManager/notification-manager.service';
import { extractUserCredentials, handleError } from '../utils';
import { trackStatusChanges } from '../../formValidations/utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginValid = true;
  registrationForm: FormGroup | null = null;
  isLoading = false;
  error: string = '';
  newUser: BookstoreUser | null = null;
  userSubscription = new Subscription();

  usernameError: string | null = null;
  emailError: string | null = null;
  passwordError: string | null = null;

  constructor(
    private authService: AuthService,
    private notificationManager: NotificationManagerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registrationForm = new FormGroup(loginForm);
    this.userSubscription = this.authService.userObservable$.subscribe((user) => {
      this.newUser = user;
    });
    trackStatusChanges(loginFormFields, this.registrationForm, this.authService.errorSubject);
    this.authService.errorObservable$.subscribe(({ field, error }) => {
      this.setValidationError(field, error);
    });
  }

  get email() {
    return this.registrationForm?.get(Fields.Email);
  }
  get username() {
    return this.registrationForm?.get(Fields.Username);
  }
  get password() {
    return this.registrationForm?.get(Fields.Password);
  }

  setValidationError(fieldName: string, error: string | null) {
    switch (fieldName) {
      case Fields.Username:
        this.usernameError = error;
        break;
      case Fields.Password:
        this.passwordError = error;
        break;
      case Fields.Email:
        this.emailError = error;
        break;
    }
  }
  
  async onSubmit() {
    this.isLoading = true;
    if (this.registrationForm?.invalid) {
      this.isLoading = false;
      console.error(ValidationErrors.FormInvalid);
      return;
    }
    try {
      const userCredentials: UserCredentials = extractUserCredentials(
        this.email as FormControl | null,
        this.password as FormControl | null,
        this.username as FormControl | null
      );
      this.authService.authenticate(userCredentials).subscribe({
        next: token => {
          this.authService.verifyToken(token).subscribe({
            next: response => {
              const newUser: BookstoreUser = {
                username: userCredentials.username,
                ...response
              };
              this.authService.userSubject.next(newUser);
              localStorage.setItem('userData', JSON.stringify(newUser));
              this.router.navigate(['bookstore']);
              this.isLoading = false;
              this.registrationForm?.reset();
            },
            error: error => {
              console.log(error)
            }
          })
        },
        error: error => {
          console.error('Authentication failed:', error);
          this.notificationManager.openSnackBar('Login failed');
          this.isLoading = false;
        }
      })
    } catch (error: any) {
      handleError(error, this.notificationManager);
    }
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}

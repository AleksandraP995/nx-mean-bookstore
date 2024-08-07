import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/authService/auth.service';
import { CustomValidators } from '../../formValidations/customValidators';
import { UsersService } from '../../../services/usersService/users.service';
import {
  Fields,
  SubmitType,
  ValidationErrors,
} from '../../formValidations/enums';
import { signupFormFields, signupForm } from '../../formValidations/forms';
import { UserCredentials } from '../../users/userEnums';
import { NotificationManagerService } from '../../../services/notificationManager/notification-manager.service';
import { extractUserCredentials, handleError } from '../utils';
import { MatDialogRef } from '@angular/material/dialog';
import { NewUserDialogComponent } from '../../users/users-list/newUserDialog/new-user-dialog.component';
import { trackStatusChanges } from '../../formValidations/utils';
import { BookstoreUser } from '@org-bookstore/app-configuration';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup | null = null;
  isLoading: boolean = false;
  error: string = '';
  newUser: BookstoreUser | null = null;
  userSubscription = new Subscription();

  nameError: string | null = null;
  confirmPasswordError: string | null = null;
  passwordError: string | null = null;
  emailError: string | null = null;
  usernameError: string | null = null;
  @Input() submitType: string = SubmitType.SignUp;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private usersService: UsersService,
    private notificationManager: NotificationManagerService,
    private dialogRef: MatDialogRef<NewUserDialogComponent>,
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group(signupForm);

    const confirmPasswordControl = this.confirmPassword;
    const passwordControl = this.password;
    if (confirmPasswordControl && passwordControl) {
      confirmPasswordControl.setValidators(
        CustomValidators.passwordMatchValidator(Fields.Password)
      );
    }

    this.userSubscription = this.authService.userObservable$.subscribe((user) => {
      this.newUser = user;
    });
    trackStatusChanges(signupFormFields, this.signupForm, this.authService.errorSubject);
    this.authService.errorObservable$.subscribe(({ field, error }) => {
      const errorMessage = error ?? '';
      this.setValidationError(field, errorMessage);
    });
  }

  get email() {
    return this.signupForm?.get(Fields.Email);
  }
  get userName() {
    return this.signupForm?.get(Fields.Username);
  }
  get name() {
    return this.signupForm?.get(Fields.Name);
  }
  get password() {
    return this.signupForm?.get(Fields.Password);
  }
  get confirmPassword() {
    return this.signupForm?.get(Fields.ConfirmPassword);
  }

  setValidationError(fieldName: string, error: string) {
    switch (fieldName) {
      case Fields.Username:
        this.usernameError = error;
        break;
      case Fields.Name:
        this.nameError = error;
        break;
      case Fields.ConfirmPassword:
        this.confirmPasswordError = error;
        break;
      case Fields.Password:
        this.passwordError = error;
        break;
      case Fields.Email:
        this.emailError = error;
        break;
    }
  }

  private createNewUserFromAdminRole(userCredentials: UserCredentials) {
    this.usersService
      .createNewUserFromAdminRole(userCredentials)
      .subscribe({
        next: () => {
          this.notificationManager.openSnackBar(
            `New user ${userCredentials.username} added`
          );
        },
        error: (error) => {
          console.error('Failed to create user', error);
          this.notificationManager.openSnackBar(
            `Failed to create user: ${error.message}`
          );
        },
      });
  }

  private signupAndNavigate(userCredentials: UserCredentials) {
    this.authService.createNewUser(userCredentials).subscribe({
      next: () => {
        this.notificationManager.openSnackBar(
          `New user ${userCredentials.username} added`
        );
        this.router.navigate(['bookstore']);
      },
      error: (err) => {
        this.notificationManager.openSnackBar(
          `Failed to create user: ${err.message}`
        );
        console.error('Sign-up and navigate failed: ', err);
      }
    });
  }

  async onSubmit(form: FormGroup) {
    this.isLoading = true;
    if (form.invalid) {
      this.isLoading = false;
      console.error(ValidationErrors.FormInvalid);
      return;
    }

    try {
      this.isLoading = false;
      const userCredentials: UserCredentials = extractUserCredentials(
        this.email as FormControl | null,
        this.password as FormControl | null,
        this.userName as FormControl | null
      );
      if (this.submitType === SubmitType.SignUp) {
        this.signupAndNavigate(userCredentials);
      }
      if (this.submitType === SubmitType.Login) {
        await this.createNewUserFromAdminRole(userCredentials);
        this.dialogRef.close();
      }
      form.reset();
    } catch (err) {
      handleError(err, this.notificationManager)
    }
  }
}

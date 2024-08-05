import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../../services/usersService/users.service';
import { MatDialog } from '@angular/material/dialog';
import { NewUserDialogComponent } from './newUserDialog/new-user-dialog.component';
import { PlaceHolderDirective } from '../helloComponent/placeholder-directive';
import { getCssCustomProperty } from '../../../shared/utils';
import { signupForm } from '../../formValidations/forms';
import { AuthService } from '../../../services/authService/auth.service';
import { BookstoreUser } from '../../../models/user';
import { Subscription } from 'rxjs';
import { CustomValidators } from '../../formValidations/customValidators';
import { NotificationManagerService } from '../../../services/notificationManager/notification-manager.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  users: BookstoreUser[] = [];
  form: FormGroup;
  newUser: BookstoreUser | null = null;
  isLoading: boolean = false;
  @ViewChild(PlaceHolderDirective, { static: false })
  helloGreeting!: PlaceHolderDirective;  
  loggedInUser: BookstoreUser | null = null;

  loggedInUserSubscription: Subscription = new Subscription();

  fileUploadForm: FormGroup | null = null;
  imagePreview: string = '';
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private authService: AuthService,
    private dialog: MatDialog,
    private notificationManager: NotificationManagerService
  ) {
    this.form = this.fb.group(signupForm);
    this.fileUploadForm = this.fb.group({
      file: [null, [Validators.required], [CustomValidators.mimeType]],
    });
  }

  openDialog(): void {
    const width = getCssCustomProperty('--new-user-dialog-width');
    const height = getCssCustomProperty('--new-user-dialog-height');
    const dialogRef = this.dialog.open(NewUserDialogComponent, {
      width: width,
      height: height,
      data: this.newUser,
      panelClass: 'custom-dialog-styling',
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  async ngOnInit() {
    this.isLoading = true;

    this.loggedInUserSubscription = this.authService.userObservable$.subscribe(
      (user) => {
        if (!user) {
          return;
        }
        this.loggedInUser = user;
      }
    );
    try {
      await this.usersService.loadAllUsers();
      this.usersService.allUsersObservable$.subscribe({
        next: (sortedUsers) => (this.users = sortedUsers),
        error: (error) => console.error('Failed to load users' + error),
      });
      this.isLoading = false;
    } catch (err) {
      this.isLoading = true;
      console.error(`Error when retrieving users`);
    }
  }

  get file() {
    return this.fileUploadForm?.get('file');
  }

  // ne radi nista
  onSubmit() {
    if (this.fileUploadForm?.invalid) {
      this.notificationManager.openSnackBar(`Invalid file type`);
      console.log('wrong')
      return;
    }
  }

  displayInvalidMessage() {
    this.notificationManager.openSnackBar(`Invalid file type`);
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.fileUploadForm!.patchValue({ file: inputElement.files[0] });
      this.fileUploadForm!.get('file')!.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(inputElement.files[0]);
    }
  }

  ngOnChange() {
    this.loggedInUserSubscription.unsubscribe();
  }

  
}

import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Subscription, firstValueFrom } from 'rxjs';
import { UsersService } from '../../../../services/usersService/users.service';
import { RemoveDialogComponent } from '../removeUserDialog/remove-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Messages } from '../../../../models/usersEnums';
import { getCssCustomProperty } from '../../../../shared/utils';
import { NotificationManagerService } from '../../../../services/notificationManager/notification-manager.service';
import { AdminRoleComponent } from '../../adminRole/admin-role.component';
import { SetAdminClaimsData } from '../../../../models/setAdminClaimsData';
import { AuthService } from '../../../../services/authService/auth.service';
import { BookstoreUser } from '@org-bookstore/app-configuration';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  @Input() user: BookstoreUser | null = null;
  isEditingEmail: boolean = false;
  updatedEmail: string = '';
  loggedInUserSubscription: Subscription = new Subscription();
  loggedInUser: BookstoreUser | null = null;

  constructor(
    private usersService: UsersService,
    public dialog: MatDialog,
    private notificationManager: NotificationManagerService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loggedInUserSubscription = this.authService.userObservable$.subscribe(
      (user) => {
        if (!user) {
          return;
        }
        this.loggedInUser = user;
      }
    );
  }

  async removeUser(event: Event): Promise<void> {
    event.stopPropagation();
    const width = getCssCustomProperty('--user-card-dialog-width');

    const dialogRef = this.dialog.open(RemoveDialogComponent, {
      width: width,
      data: { email: this.user?.email },
      panelClass: 'user-card-dialog-styling',
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        try {
          const data = await firstValueFrom(
            this.usersService.deleteUser(this.user?.id ?? '')
          );
          console.log(`${Messages.DeletionSuscessful}`, data);
          this.notificationManager.openSnackBar(
            `User  ${this.user?.email} successfully deleted`
          );
          this.usersService.loadAllUsers();
        } catch (err) {
          this.notificationManager.openSnackBar(
            `${Messages.DeletionNotSuscessful} ${err as string}`
          );
        }
      }
    });
  }

  async addAdminRole(event: Event): Promise<void> {
    event.stopPropagation();

    if (!this.loggedInUser?.isSuperAdmin) {
      this.notificationManager.openSnackBar(
        'Only super admins can change admin roles.'
      );
      return;
    }

    const width = getCssCustomProperty('--user-card-dialog-width');
    const dataToSend: SetAdminClaimsData = {
      email: this.user?.email ?? '',
      isAdmin: this.user?.isAdmin ?? false,
    };

    const dialogRef = this.dialog.open(AdminRoleComponent, {
      width: width,
      data: dataToSend,
      panelClass: 'user-card-dialog-styling',
    });
    
    dialogRef.afterClosed().subscribe(async (result) => {
      result = result == undefined ? true : result;
      if (result) {
        try {
          await this.promoteToAdmin(this.user?.id ?? '');
          console.log(`${Messages.GrantedAddminRole} ${this.user?.email}`);
        } catch (err) {
          console.error('Error promoting user to admin: ', err);
        }
      }
    });
  }

  async promoteToAdmin(userId: string) {
    try {
      const response = await firstValueFrom(this.usersService
        .setAdminClaims(userId));
        
      const setAdminRights = response?.message.includes('set');
      if (!this.user) {
        throw new Error('User is null or undefined.');
      }

      if (setAdminRights) {
        this.setAdminStatus(true);
        this.showAdminStatusMessage(true);
      } else {
        this.setAdminStatus(false);
        this.showAdminStatusMessage(false);
      }
    } catch (err) {
      console.error('Error promoting user to admin: ', err);
      this.notificationManager.openSnackBar(`${err}`);
    }
  }

  private setAdminStatus(isAdmin: boolean) {
    if (this.user) {
      this.user.isAdmin = isAdmin;
      console.log(`User ${this.user.email} is admin: ${isAdmin}`);
    }
  }

  private showAdminStatusMessage(isPromoted: boolean) {
    if (this.user) {
      const action = isPromoted ? 'promoted to' : 'demoted from';
      this.notificationManager.openSnackBar(
        `User ${this.user.email} ${action} admin`
      );
    }
  }

  enableEmailEdit(): void {
    this.isEditingEmail = true;
  }

  disableEmailEdit(event: Event) {
    event.stopPropagation();
    // debugger;
    if (this.isEditingEmail) {
      this.isEditingEmail = false;
      this.updateEmail();
    }
  }

  async updateEmail() {
    // debugger;
    if (this.updatedEmail == this.user?.email || this.updatedEmail == '') {
      this.isEditingEmail = false;
      return;
    }
    try {
      const data = await firstValueFrom(
        this.usersService.updateUserEmail(
          this.user?.id ?? '',
          this.updatedEmail
        )
      );
      console.log('User email updated successfully' + data);
      this.notificationManager.openSnackBar(
        `Email updated successfully to ${this.updatedEmail}`
      );
      if (this.user) {
        // Ensure this.user is not null before updating the email
        this.user.email = this.updatedEmail;
      }
      this.isEditingEmail = false;
    } catch (error) {
      console.error('Error updating user email:', error),
        this.notificationManager.openSnackBar(`Email not updated ${error}`);
    }
  }

  //@HostListener used to listen for document-wide click events to detect clicks outside the email input field
  //onContainerClick prevents the click event from propagating to the document when clicking inside the container
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (this.isEditingEmail) {
      const target = event.target as HTMLElement;
      if (!target.closest('.title-fixed-width')) {
        this.isEditingEmail = false;
      }
    }
  }

  onContainerClick(event: Event) {
    event.stopPropagation();
  }

  ngOnDestroy() {
    this.loggedInUserSubscription.unsubscribe();
  }
}

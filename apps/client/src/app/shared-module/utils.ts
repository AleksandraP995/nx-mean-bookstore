import { NotificationManagerService } from '../../services/notification-manager/notification-manager.service';
import { ValidationErrors } from '../formValidations/enums';
import { UserCredentials } from '../users/user-enums';
import { FormControl } from '@angular/forms';

export function extractFormErrors(formData: any) {
  return;
}

export function handleError(
  error: any,
  notificationManager: NotificationManagerService
) {
  console.error(ValidationErrors.SignUpError, error);
  notificationManager.openSnackBar(error.message);
}

export function extractUserCredentials(email: FormControl | null, password:FormControl | null, username: FormControl | null): UserCredentials {
    return {
      email: email?.value ?? '',
      password: password?.value ?? '',
      username: username?.value ?? '',
    };
  }

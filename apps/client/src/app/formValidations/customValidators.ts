import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Observable, Observer, of } from 'rxjs';

export class CustomValidators {
  static nameValidator(control: AbstractControl) {
    //must start with upperCase
    if (control.value && !/^[A-Z]/.test(control.value)) {
      return { invalidName: true };
    }
    return null;
  }

  static passwordValidator(control: AbstractControl) {
    //must have symbol, number, and upperCase
    if (control.value && !/(?=.*\d)(?=.*[A-Z])(?=.*\W)/.test(control.value)) {
      return { invalidPassword: true };
    }
    return null;
  }

  static passwordMatchValidator(passwordControlName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const formGroup = control.parent;
      if (!FormGroup) {
        return null;
      }
      const password = formGroup?.get(passwordControlName)?.value;
      const confirmPassword = control.value;
      if (password !== confirmPassword) {
        return { passwordMismatch: true };
      } else {
        return null;
      }
    };
  }

  static discountCodeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!/^[a-z]/.test(value)) {
        return { lowercaseLetter: true };
      }

      if (!/\d/.test(value)) {
        return { hasNumber: true };
      }

      if (value.length < 6) {
        return { minLength: true };
      }

      return null;
    };
  }

  static mimeType(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const file = control.value as File;
    if (!file) {
      return of(null); // No file selected, return valid
    }
  
    const fileReader = new FileReader();
    const customObservable = new Observable(
      (observer: Observer<ValidationErrors | null>) => {
        fileReader.addEventListener('loadend', () => {
          const arrBuffer = fileReader.result as ArrayBuffer;
          if (!arrBuffer) {
            observer.next({ invalidMimeType: true });
            observer.complete();
            return;
          }
  
          const arr = new Uint8Array(arrBuffer).subarray(0, 4);
          let header = '';
          for (let i = 0; i < arr.length; i++) {
            header += arr[i].toString(16);
          }
          let isValid = false;
          switch (header) {
            case '89504e47':
              isValid = true; //png
              break;
            case 'ffd8ffe0':
            case 'ffd8ffe1':
            case 'ffd8ffe2':
              isValid = true; //jpeg
              break;
            case '47494638':
              isValid = true; //gif
              break;
            default:
              isValid = false;
              break;
          }
  
          if (isValid) {
            observer.next(null); 
          } else {
            observer.next({ invalidMimeType: true }); 
          }
          observer.complete();
        });
        fileReader.readAsArrayBuffer(file);
      }
    );
    return customObservable;
  }
  
}

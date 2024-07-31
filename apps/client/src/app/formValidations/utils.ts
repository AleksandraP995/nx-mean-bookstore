import { FormGroup } from '@angular/forms';
import { errorMessages } from './errorMessages';
import { Subject } from 'rxjs';

export function setValidationError(
  fieldName: string,
  form: FormGroup<any>,
  errorSubject: Subject<{ field: string; error: string | null }>
) {
  const control = form.get(fieldName);
  let error: string | null = null;
  if (control && control.errors) {
    for (const errorKey in control.errors) {
      if (
        control.errors.hasOwnProperty(errorKey) &&
        errorMessages[fieldName][errorKey]
      ) {
        error = errorMessages[fieldName][errorKey];
        break;
      }
    }
  }
  errorSubject.next({ field: fieldName, error });
}

export function trackStatusChanges(
  formFields: string[],
  form: FormGroup<any>,
  errorSubject: Subject<{ field: string; error: string | null }>
) {
  formFields.forEach((fieldName) => {
    //ne moze samo return jer se mi ovde subskrajbujemo
    form.get(fieldName)?.statusChanges.subscribe({
      next: () => {
        setValidationError(fieldName, form, errorSubject);
      },
      error: (err) => console.error('Error occured ' + err),
    });
  });
}

import {Observable, of as observableOf} from 'rxjs';
import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {catchError, map} from "rxjs/operators";
import {UserService} from "../../users/user.service";

export function verifyUniqueUserEmail(userService: UserService, currentEmail: string): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    if (control.value === currentEmail) return observableOf(null);
    return userService.checkforEmail(control.value).pipe(
        map(emailAvailable => {
          return !emailAvailable ? { emailTaken: true } : null;
        }),
        catchError(err => {
          return null;
        })
    );
  };
}



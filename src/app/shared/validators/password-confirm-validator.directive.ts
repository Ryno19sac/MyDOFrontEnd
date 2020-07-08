import {FormGroup} from '@angular/forms';

export function passwordConfirmValidator(passwordKey: string, confirmPasswordKey: string) {
  return (group: FormGroup): { [key: string]: any } => {
    const password = group.controls[passwordKey].value;
    const confirmPasswordControl = group.controls[confirmPasswordKey];
    const confirmPasswordValue = confirmPasswordControl.value;

    if (password !== confirmPasswordValue) {
      console.log('passwords do not match');
      // set the error on the object
      confirmPasswordControl.setErrors({
        mismatchedPasswords: true
      });
      // also return it so it hits at the form level
      return {
        mismatchedPasswords: true
      };
    }
    console.log('passwords are a match');
    // else nada
    return null;
  };
}

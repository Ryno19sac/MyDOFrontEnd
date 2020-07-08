import {AbstractControl, ValidatorFn} from '@angular/forms';

export function notBlankValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    // make sure we don't operate on empty strings
    if (!control.value || control.value.length === 0) {
      return null;
    }
    // trim it,  the value and return
    return control.value.trim().length === 0 ? { notBlank: { value: control.value } } : null;
  };
}

import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function noPastDatesValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const selectedDate = new Date(control.value);
      const today = new Date();
  
      today.setHours(0, 0, 0, 0);
      selectedDate.setHours(0, 0, 0, 0);
  
      return selectedDate < today ? { pastDate: true } : null;
    };
}
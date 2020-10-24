import { FormGroup, AbstractControl } from '@angular/forms';

export function checkSpecialCharacters(inputName: string) {
    return (formGroup: FormGroup) => {
      const input = formGroup.controls[inputName];

      if (input.errors && !input.errors.checkSpecialCharacters) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      let valid = true;
      if (input && input.value.length > 0) {
        for (let i = 0; i < input.value.length; i++) {
          if (input.value.charAt(i).match(/^[^a-zA-Z0-9áéíóúÁÉÍÓÚÑñ ]+$/) !== null ) {
            valid = false;
            input.setErrors({ checkSpecialCharacters: true });
          }
        }
      }else {
        input.setErrors(null);
      }
    }
  }

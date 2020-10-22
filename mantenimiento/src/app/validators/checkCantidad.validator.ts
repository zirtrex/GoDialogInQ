import { FormGroup, AbstractControl } from '@angular/forms';

export function CheckCantidad(cantidadName: string, cantidadMaximaName: string) {
  return (formGroup: FormGroup) => {
      const cantidad = formGroup.controls[cantidadName];
      const cantidadMaxima = formGroup.controls[cantidadMaximaName]; 

      if (cantidad.errors && !cantidad.errors.checkCantidad) {
          // return if another validator has already found an error on the matchingControl
          return;
      }

      // set error on matchingControl if validation fails
      if (parseInt(cantidad.value) > parseInt(cantidadMaxima.value)) {
          cantidad.setErrors({ checkCantidad: true });
      } else {
          cantidad.setErrors(null);
      }
  }
}

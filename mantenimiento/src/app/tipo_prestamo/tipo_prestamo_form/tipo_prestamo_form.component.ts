import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { TipoPrestamoService } from '../../services/tipo_prestamo.service';
import { TipoPrestamo } from '../../models/tipo_prestamo';
import { checkSpecialCharacters } from '../../validators/checkSpecialCharacters.validator';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }  
}

@Component({
  selector: 'app-tipo_prestamo-form',
  templateUrl: './tipo_prestamo_form.component.html',
  styleUrls: []
})
export class TipoPrestamoFormComponent implements OnInit  {

  params: any;
  idTipoPrestamo: any;
  action: number;
  textForm: string;
  tipoPrestamo: TipoPrestamo;
  tipoPrestamoForm: FormGroup;
  errorStateMatcher: ErrorStateMatcher = new MyErrorStateMatcher();

  constructor(
    private tipoPrestamoService:TipoPrestamoService,
    private router:Router,
    public dialogRef: MatDialogRef<TipoPrestamoFormComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    if (data.action == 0) {
      this.tipoPrestamo = new TipoPrestamo();
      this.action = data.action;
    } else {
      this.tipoPrestamo = data.tipoPrestamo;
      this.action = data.action;
    }
  }

  ngOnInit() {

    this.tipoPrestamoForm = this.fb.group({
      idTipoPrestamo: [this.tipoPrestamo.idTipoPrestamo],
      nombreTipoPrestamo: [this.tipoPrestamo.nombreTipoPrestamo, Validators.compose( [Validators.required, Validators.minLength(2)] )]
    },
    {
      validator: [checkSpecialCharacters('nombreTipoPrestamo')]
    });

    if (this.action == 0) {
      this.textForm = "Crear";
    } else if (this.action == 1){
      this.textForm = "Editar";
    } else {
      this.textForm = "Eliminar";
    }
  }

  getAction (tipoPrestamo){
    if (this.action == 0) {
      this.create(tipoPrestamo);
    } else if (this.action == 1){
      this.update(tipoPrestamo);
    } else {
      this.delete(tipoPrestamo);
    }
  }

  create (tipoPrestamo){
    console.log(tipoPrestamo);
    this.tipoPrestamoService.add(tipoPrestamo)
      .subscribe(
        response => {
            console.log(response);
            this.snackBar.open(response.message, null, {
              duration: 10000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['text-warning']
            });
            if(!response.error){
              //this.router.navigate(['/productos']);
              this.closeDialog();
            }
        },
        error => {
          console.log(error);
          var result = error.result;
          console.log(result);
          if (typeof result === 'object') {
            this.snackBar.open("El tipo de prestamo ya existe", null, {
              duration: 10000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['text-warning']
            }); 
          }          
        }
      )
  }

  update(tipoPrestamo){
    this.tipoPrestamoService.edit(tipoPrestamo)
      .subscribe(
        response => {
          console.log(response);
          this.snackBar.open(response.message, null, {
            duration: 10000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['text-warning']
          });
          if(!response.error){
              //this.router.navigate(['/productos']);
              this.closeDialog();
          }
        },
        error => {
          console.log(error);
          var result = error.result;
          console.log(result);
          if (typeof result === 'object') {
            this.snackBar.open("El tipo de prestamo ya existe", null, {
              duration: 10000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['text-warning']
            }); 
          }
        }
      )
  }

  delete (tipoPrestamo){
    this.tipoPrestamoService.delete(tipoPrestamo.idTipoPrestamo)
      .subscribe(
        response => {
            console.log(response);
            this.snackBar.open(response.message, null, {
              duration: 10000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['text-warning']
            });
            if(!response.error){
              this.closeDialog();
            }
        },
        error => {
          console.log(error);
          var result = error.result;
          console.log(result);
          if (typeof result === 'object') {
            this.snackBar.open("Error desconocido", null, {
              duration: 10000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['text-warning']
            }); 
          }          
        }
      )
  }

  closeDialog(){
    this.dialogRef.close();
  }

}

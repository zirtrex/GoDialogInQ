import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { RequisitoService } from '../../services/requisito.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Requisito } from '../../models/requisito';
import { checkSpecialCharacters } from '../../validators/checkSpecialCharacters.validator';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }  
}

@Component({
  selector: 'app-requisito-form',
  templateUrl: './requisito_form.component.html',
  styleUrls: []
})
export class RequisitoFormComponent implements OnInit {

  idRequisito: any;
  idTipoPrestamo: any;
  params: any;
  action: number;
  textForm: string;
  requisito: Requisito;
  requisitoForm: FormGroup;
  errorStateMatcher: ErrorStateMatcher = new MyErrorStateMatcher();

  constructor(
    private requisitoService:RequisitoService,
    private router:Router,
    public dialogRef: MatDialogRef<RequisitoFormComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    if (data.action == 0) {      
      this.action = data.action;
      this.idTipoPrestamo = data.idTipoPrestamo;
      this.requisito = new Requisito();
    } else {
      this.action = data.action;
      this.idTipoPrestamo = data.idTipoPrestamo;
      this.requisito = data.requisito;
    }
  }

  ngOnInit() {

    this.requisitoForm = this.fb.group({
      idRequisito: [this.requisito.idRequisito],
      descripcionRequisito: [this.requisito.descripcionRequisito, Validators.compose( [Validators.required, Validators.minLength(2), Validators.maxLength(200)] )],
      idTipoPrestamo: [this.requisito.idTipoPrestamo]
    },
    {
      validator: [checkSpecialCharacters('descripcionRequisito')]
    });

    if (this.action == 0) {
      this.textForm = "Crear";
    } else if (this.action == 1){
      this.textForm = "Editar";
    } else {
      this.textForm = "Eliminar";
    }   
  }

  getAction(requisito){
    requisito.idTipoPrestamo = this.idTipoPrestamo;
    if (this.action == 0) {
      this.create(requisito);
    } else if (this.action == 1){
      this.update(requisito);
    } else {
      this.delete(requisito);
    }
  }

  create (requisito){
    this.requisitoService.create(requisito)
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

  update (requisito){
    this.requisitoService.update(requisito)
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

  delete (requisito){
    this.requisitoService.delete(requisito.idRequisito)
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

  closeDialog(){
    this.dialogRef.close();
  }

}

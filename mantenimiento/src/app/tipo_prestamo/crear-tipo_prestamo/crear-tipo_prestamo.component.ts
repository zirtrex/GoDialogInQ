import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoPrestamoService } from '../../services/tipo_prestamo.service';
import { MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-crear-tipo_prestamo',
  templateUrl: './crear-tipo_prestamo.component.html',
  styleUrls: []
})
export class CrearTipoPrestamoComponent implements OnInit {

  constructor(
    private tipoPrestamoService:TipoPrestamoService,
    private router:Router,
    public dialogRef: MatDialogRef<CrearTipoPrestamoComponent>,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
  }

  addTipoPrestamo(tipoPrestamo){
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
              this.cerrarDialog();
            }
        },
        error => console.log(<any> error)
      )
  }

  cerrarDialog(){
    this.dialogRef.close();
  }

}

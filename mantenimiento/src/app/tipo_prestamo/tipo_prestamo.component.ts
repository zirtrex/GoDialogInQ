import { Component, OnInit, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoPrestamo } from '../models/tipo_prestamo';
import { TipoPrestamoService } from '../services/tipo_prestamo.service';
import { TipoPrestamoFormComponent } from '../tipo_prestamo/tipo_prestamo_form/tipo_prestamo_form.component';
import {
  MatTableDataSource,
  MatSort,
  MatPaginator,
  MatDialog,
  MatDialogConfig,
  MatSnackBar
} from '@angular/material';

@Component({
  selector: 'app-tipo_prestamo',
  templateUrl: './tipo_prestamo.component.html',
  styleUrls: []
})
export class TipoPrestamoComponent implements OnInit {

  //productos: Observable<Producto[]>;

  displayedColumns: string[] = ['idTipoPrestamo', 'nombreTipoPrestamo', 'estado', 'acciones'];
  dataSource: MatTableDataSource<TipoPrestamo>;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  keyPressed: string;

  constructor(
    private tipoPrestamoService:TipoPrestamoService,
    public dialog:MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.tipoPrestamoService.getAll().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.paginator._intl.firstPageLabel = 'Primera página';
        this.paginator._intl.itemsPerPageLabel = 'Productos por página';
        this.paginator._intl.lastPageLabel = 'Última página';
        this.paginator._intl.nextPageLabel = 'Siguiente';
        this.paginator._intl.previousPageLabel = 'Anterior';
        this.dataSource.paginator = this.paginator;
        this.changeDetectorRefs.detectChanges();
        //console.log(this.dataSource);
      }
    );
  }

  filterApply() {
    this.dataSource.filter = this.keyPressed.trim().toLowerCase();
  }

  searchClean(){
    this.keyPressed = "";
    this.filterApply();
  }

  create(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "auto";
    dialogConfig.data = {action: 0};
    this.dialog.open(TipoPrestamoFormComponent, dialogConfig)
      .afterClosed().subscribe(result => this.getData());
  }

  edit(tipoPrestamo){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "auto";
    dialogConfig.data = {action: 1, tipoPrestamo};
    this.dialog.open(TipoPrestamoFormComponent, dialogConfig)
      .afterClosed().subscribe(result => this.getData());
  }

  delete(tipoPrestamo){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "auto";
    dialogConfig.data = {action: 2, tipoPrestamo};
    this.dialog.open(TipoPrestamoFormComponent, dialogConfig)
      .afterClosed().subscribe(result => this.getData());
  }
}

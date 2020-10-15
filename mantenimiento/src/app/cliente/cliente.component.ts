import { Component, OnInit, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';
import { ClienteService } from '../services/cliente.service';
import { ClienteFormComponent } from '../cliente/cliente_form/cliente_form.component';

import {
  MatTableDataSource,
  MatSort,
  MatPaginator,
  MatDialog,
  MatDialogConfig,
  MatSnackBar
} from '@angular/material';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: []
})
export class ClienteComponent implements OnInit {

  displayedColumns: string[] = ['idCliente', 'apellidos', 'nombres', 'tipoDocumento', 'documento', 'acciones'];
  dataSource: MatTableDataSource<Cliente>;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  keyPressed: string;

  constructor(
    private clienteService:ClienteService,
    public dialog:MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.clienteService.getAll().subscribe(
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
    this.dialog.open(ClienteFormComponent, dialogConfig)
      .afterClosed().subscribe(result => this.getData());
  }

  edit(requisito){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "auto";
    dialogConfig.data = {action: 1, requisito};
    this.dialog.open(ClienteFormComponent, dialogConfig)
      .afterClosed().subscribe(result => this.getData());
  }

  delete(requisito){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "auto";
    dialogConfig.data = {action: 2, requisito};
    this.dialog.open(ClienteFormComponent, dialogConfig)
      .afterClosed().subscribe(result => this.getData());
  }
}

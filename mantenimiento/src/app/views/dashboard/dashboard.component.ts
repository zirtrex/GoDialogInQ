import { Component, OnInit, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PrestamoClienteService } from '../../services/prestamo_cliente.service';

import { PrestamoCliente } from '../../models/prestamo_cliente';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort  } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent {

  destroy$: Subject<boolean> = new Subject<boolean>();
  usuariosCalificados: number;
  usuariosNoCalificados: number;

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private prestamoClienteService:PrestamoClienteService,
    public dialog:MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
  ) {}
 
  ngOnInit() {    
    this.getCalificaciones();       
  }

  getCalificaciones() {
    this.prestamoClienteService.getCalificaciones().pipe(takeUntil(this.destroy$)).subscribe(
      (res) => {
        console.log(res);
        this.usuariosCalificados = res.califica;
        this.usuariosNoCalificados = res.nocalifica;
      },
      (error) => {
        console.log(error);
        this.usuariosCalificados = error.califica;
        this.usuariosNoCalificados = error.nocalifica;
      },

    );
  }

  getTraficoCalificaciones() {
    this.prestamoClienteService.getTraficoCalificaciones().pipe(takeUntil(this.destroy$)).subscribe(
      (res) => {
        console.log(res);
        
      },
      (error) => {
        console.log(error);
        
      },

    );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

}

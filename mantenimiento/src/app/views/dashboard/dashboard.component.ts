import { Component, OnInit, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PrestamoClienteService } from '../../services/prestamo_cliente.service';

import { PrestamoCliente } from '../../models/prestamo_cliente';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';


@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent {

  destroy$: Subject<boolean> = new Subject<boolean>();
  public usuariosCalificados: number;
  public usuariosNoCalificados: number;

  lineChartData: ChartDataSets[] = [
    { data: [15, 30, 18, 75, 77, 75], label: 'Califican' },
    { data: [14, 45, 38, 75, 27, 75], label: 'No Califican' },
    { data: [29, 75, 56, 150, 104, 150], label: 'Total' },
  ];

  lineChartLabels: Label[] = ['01/12/2020', '02/12/2020', '03/12/2020', '04/12/2020', '05/12/2020', '06/12/2020'];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'green',
    },
    {
      borderColor: 'red',
    },
    {
      borderColor: 'black',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private prestamoClienteService:PrestamoClienteService,
    public dialog:MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
  ) {}
 
  ngOnInit() {    
    this.getCalificaciones();
    this.getTraficoCalificaciones();   
  }

  getCalificaciones() {
    this.prestamoClienteService.getCalificaciones().pipe(takeUntil(this.destroy$)).subscribe(
      (res) => {
        console.log(res);
        this.usuariosCalificados = res.result[0].califica;
        this.usuariosNoCalificados = res.result[0].nocalifica;
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

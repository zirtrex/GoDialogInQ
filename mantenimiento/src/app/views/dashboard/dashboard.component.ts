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
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent {

  destroy$: Subject<boolean> = new Subject<boolean>();
  public usuariosCalificados: number;
  public usuariosNoCalificados: number;
  public label: Array<string> = [];
  public califica: Array<number> = [];
  public noCalifica: Array<number> = [];
  public total: Array<number> = [];

  lineChartData: ChartDataSets[] = [
    { data: this.califica, label: 'Califican' },
    { data: this.noCalifica, label: 'No Califican' },
    { data: this.total, label: 'Total' },
  ];

  lineChartLabels: Label[] = this.label;

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
        this.label.push(...res.result.fecha);
        this.califica.push(...res.result.califica);
        this.noCalifica.push(...res.result.noCalifica);
        this.total.push(...res.result.total);
      },
      (error) => {
        console.log(error);
        this.label.push(...error.result.fecha);
        this.califica.push(...error.result.califica);
        this.noCalifica.push(...error.result.noCalifica);
        this.total.push(...error.result.total);
      },

    );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

}

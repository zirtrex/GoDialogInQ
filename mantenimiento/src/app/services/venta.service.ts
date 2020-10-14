import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse   } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError  } from 'rxjs';
import { Venta } from '../models/venta';

@Injectable()
export class VentaService {

  private REST_API_SERVER_DEV = "http://localhost/Rafael/Proyectos/Proyectos_Web/semagen-app/semagen-api/public/index.php/api/v1/ventas";
  private REST_API_SERVER_PROD = "http://zirtrex.net/semagen_api/public/index.php/api/v1/ventas";

  constructor(private http:HttpClient) { }

  getVentas(): Observable<Venta[]>{
    return this.http
              .get<Venta[]>(this.REST_API_SERVER_PROD)
              .pipe(catchError(this.handleError));
  }

  //Cambio de Venta[] por any
  agregarVenta(venta: Venta): Observable<any>{
    return this.http
              .post<any>(this.REST_API_SERVER_PROD, venta)
              .pipe(catchError(this.handleError));
  }

  obtenerVenta(idVentas: String): Observable<any>{
    return this.http
              .get<any>(this.REST_API_SERVER_PROD + '/' + idVentas)
              .pipe(catchError(this.handleError));
  }

  editarVenta(venta: Venta): Observable<any>{
    const url = `${this.REST_API_SERVER_PROD}/${venta["idVentas"]}`; //console.log(venta);
    return this.http
              .put<any>(url, venta)
              .pipe(catchError(this.handleError));
  }

  eliminarVenta(idVentas: String): Observable<any>{
    const url = `${this.REST_API_SERVER_PROD}/${idVentas}`;
    return this.http
              .delete<any>(url)
              .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}

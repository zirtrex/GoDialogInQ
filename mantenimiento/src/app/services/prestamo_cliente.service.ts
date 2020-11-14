import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse  } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError  } from 'rxjs';
import { PrestamoCliente } from '../models/prestamo_cliente';

@Injectable()
export class PrestamoClienteService {

    private REST_API_SERVER_DEV = "http://localhost:8081/prestamo_cliente";
    private REST_API_SERVER_PROD = "http://localhost:8081/prestamo_cliente";

    constructor(private http:HttpClient) { }

    getAll(): Observable<any>{
      return this.http
                .get<any>(this.REST_API_SERVER_DEV + "/detalle")
                .pipe(catchError(this.handleError));
    }

    add(prestamoCliente: PrestamoCliente): Observable<any>{
      return this.http
                .post<any>(this.REST_API_SERVER_DEV, prestamoCliente)
                .pipe(catchError(this.handleError));
    }

    get(idPrestamoCliente: String): Observable<any>{
      return this.http
                .get<any>(this.REST_API_SERVER_DEV + '/' + idPrestamoCliente);
    }

    edit(prestamoCliente: PrestamoCliente): Observable<any>{
      const url = `${this.REST_API_SERVER_DEV}/${prestamoCliente["idPrestamoCliente"]}`;
      return this.http
                .put<any>(url, prestamoCliente)
                .pipe(catchError(this.handleError));
    }

    delete(idPrestamoCliente: string): Observable<any>{
      const url = `${this.REST_API_SERVER_DEV}/${idPrestamoCliente}`;
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
      //window.alert(error.error);
      return throwError(error.error);
    }
}

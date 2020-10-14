import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse  } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError  } from 'rxjs';
import { TipoPrestamo } from '../models/tipo_prestamo';

@Injectable()
export class TipoPrestamoService {

    private REST_API_SERVER_DEV = "http://localhost:8081/tipo_prestamo";
    private REST_API_SERVER_PROD = "http://zirtrex.net/semagen_api/public/index.php/api/v1/productos";

    constructor(private http:HttpClient) { }

    getAll(): Observable<TipoPrestamo[]>{
      return this.http
                .get<TipoPrestamo[]>(this.REST_API_SERVER_DEV)
                .pipe(catchError(this.handleError));
    }

    //Se cambio Producto[] por any porque aquí no siempre devuelve un producto
    add(tipoPrestamo: TipoPrestamo): Observable<any>{
      return this.http
                .post<any>(this.REST_API_SERVER_DEV, tipoPrestamo)
                .pipe(catchError(this.handleError));
    }

    get(idProducto: String): Observable<any>{
      return this.http
                .get<any>(this.REST_API_SERVER_DEV + '/' + idProducto);
    }

    edit(tipoPrestamo: TipoPrestamo): Observable<any>{
      const url = `${this.REST_API_SERVER_DEV}/${tipoPrestamo["idTipoPrestamo"]}`;
      return this.http
                .put<any>(url, tipoPrestamo)
                .pipe(catchError(this.handleError));
    }

    delete(idTipoPrestamo: string): Observable<any>{
      const url = `${this.REST_API_SERVER_DEV}/${idTipoPrestamo}`;
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

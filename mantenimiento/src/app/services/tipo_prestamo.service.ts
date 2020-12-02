import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse  } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError  } from 'rxjs';
import { environment } from '../../environments/environment';
import { TipoPrestamo } from '../models/tipo_prestamo';

const {
  BACK_PROTOCOL,
  BACK_HOST,
  BACK_PORT
} = environment;

const urlBase =  BACK_PROTOCOL + "://" + BACK_HOST + ":" + BACK_PORT;

@Injectable()
export class TipoPrestamoService {

    private REST_API_SERVER = urlBase + "/tipo_prestamo";

    constructor(private http:HttpClient) { }

    getAll(): Observable<any>{
      return this.http
                .get<any>(this.REST_API_SERVER)
                .pipe(catchError(this.handleError));
    }

    add(tipoPrestamo: TipoPrestamo): Observable<any>{
      return this.http
                .post<any>(this.REST_API_SERVER, tipoPrestamo)
                .pipe(catchError(this.handleError));
    }

    get(idProducto: String): Observable<any>{
      return this.http
                .get<any>(this.REST_API_SERVER + '/' + idProducto);
    }

    edit(tipoPrestamo: TipoPrestamo): Observable<any>{
      const url = `${this.REST_API_SERVER}/${tipoPrestamo["idTipoPrestamo"]}`;
      return this.http
                .put<any>(url, tipoPrestamo)
                .pipe(catchError(this.handleError));
    }

    delete(idTipoPrestamo: string): Observable<any>{
      const url = `${this.REST_API_SERVER}/${idTipoPrestamo}`;
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
      //window.alert(errorMessage);
      return throwError(error.error);
    }
}

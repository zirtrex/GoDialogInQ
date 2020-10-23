import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse  } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError  } from 'rxjs';
import { Requisito } from '../models/requisito';
import { GenericObject } from '../models/generic_object';

@Injectable()
export class RequisitoService {

    private REST_API_SERVER_DEV = "http://localhost:8081/requisito";
    private REST_API_SERVER_PROD = "http://zirtrex.net/semagen_api/public/index.php/api/v1/productos";

    constructor(private http:HttpClient) { }

    getAll(): Observable<any> {
      return this.http
        .get<any>(this.REST_API_SERVER_DEV)
        .pipe(catchError(this.handleError));
    }

    getAllByIdTipoPrestamo(idTipoPrestamo: any): Observable<any> {
      return this.http
                .get<any>(this.REST_API_SERVER_DEV+ '/tipo_prestamo/' + idTipoPrestamo)
                .pipe(catchError(this.handleError));
    }

    get(idRequisito: String): Observable<any>{
      return this.http
                .get<any>(this.REST_API_SERVER_DEV + '/' + idRequisito);
    }

    create(requisito: Requisito): Observable<any> {
      return this.http
                .post<any>(this.REST_API_SERVER_DEV, requisito)
                .pipe(catchError(this.handleError));
    }

    update(requisito: Requisito): Observable<any> {
      const url = `${this.REST_API_SERVER_DEV}/${requisito["idRequisito"]}`;
      return this.http
                .put<any>(url, requisito)
                .pipe(catchError(this.handleError));
    }

    delete(idRequisito: string): Observable<any>{
      const url = `${this.REST_API_SERVER_DEV}/${idRequisito}`;
      return this.http
                .delete<any>(url)
                .pipe(catchError(this.handleError));
    }

    handleError(error: HttpErrorResponse) {
      let errorMessage = 'Unknown error!';
      console.log(error.error);
      if (error.error instanceof ErrorEvent) {
        // Client-side errors
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Server-side errors
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      //window.alert(errorMessage);
      return error.error;
      //return throwError(errorMessage);
    }
}

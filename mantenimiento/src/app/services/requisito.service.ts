import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse  } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError  } from 'rxjs';
import { environment } from '../../environments/environment';
import { Requisito } from '../models/requisito';
import { GenericObject } from '../models/generic_object';

const {
  BACK_PROTOCOL,
  BACK_HOST,
  BACK_PORT
} = environment;

const urlBase =  BACK_PROTOCOL + "://" + BACK_HOST + ":" + BACK_PORT;

@Injectable()
export class RequisitoService {

    private REST_API_SERVER = urlBase + "/requisito";

    constructor(private http:HttpClient) { }

    getAll(): Observable<any> {
      return this.http
        .get(this.REST_API_SERVER)
        .pipe(catchError(this.handleError));
    }

    getAllByIdTipoPrestamo(idTipoPrestamo: any): Observable<any> {
      return this.http
                .get<any>(this.REST_API_SERVER+ '/tipo_prestamo/' + idTipoPrestamo)
                .pipe(catchError(this.handleError));
    }

    get(idRequisito: String): Observable<any>{
      return this.http
                .get<any>(this.REST_API_SERVER + '/' + idRequisito);
    }

    create(requisito: Requisito): Observable<any> {
      return this.http
                .post<any>(this.REST_API_SERVER, requisito)
                .pipe(catchError(this.handleError));
    }

    update(requisito: Requisito): Observable<any> {
      const url = `${this.REST_API_SERVER}/${requisito["idRequisito"]}`;
      return this.http
                .put<any>(url, requisito)
                .pipe(catchError(this.handleError));
    }

    delete(idRequisito: string): Observable<any>{
      const url = `${this.REST_API_SERVER}/${idRequisito}`;
      return this.http
                .delete<any>(url)
                .pipe(catchError(this.handleError));
    }

    handleError(error: HttpErrorResponse) {
      let errorMessage = 'Unknown error!';
      //console.log(error.error);
      if (error.error instanceof ErrorEvent) {
        // Client-side errors
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Server-side errors
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      //window.alert(errorMessage);
      return throwError(error.error);
      //return throwError(errorMessage);
    }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse  } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError  } from 'rxjs';
import { environment } from '../../environments/environment';
import { Cliente } from '../models/cliente';

const {
    BACK_PROTOCOL,
    BACK_HOST,
    BACK_PORT
} = environment;

const urlBase =  BACK_PROTOCOL + "://" + BACK_HOST + ":" + BACK_PORT;

console.log("Mantenimiento on: " + urlBase);

@Injectable()
export class ClienteService {    

    private REST_API_SERVER = urlBase + "/cliente";

    constructor(private http:HttpClient) { }

    getAll(): Observable<any>{
      return this.http
                .get<any>(this.REST_API_SERVER)
                .pipe(catchError(this.handleError));
    }

    add(cliente: Cliente): Observable<any>{
      return this.http
                .post<any>(this.REST_API_SERVER, cliente)
                .pipe(catchError(this.handleError));
    }

    get(idCliente: String): Observable<any>{
      return this.http
                .get<any>(this.REST_API_SERVER + '/' + idCliente);
    }

    edit(cliente: Cliente): Observable<any>{
      const url = `${this.REST_API_SERVER}/${cliente["idCliente"]}`;
      return this.http
                .put<any>(url, cliente)
                .pipe(catchError(this.handleError));
    }

    delete(idCliente: string): Observable<any>{
      const url = `${this.REST_API_SERVER}/${idCliente}`;
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

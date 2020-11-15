import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse  } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError  } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable()
export class ClienteService {

    private REST_API_SERVER_DEV = "http://localhost:8081/cliente";
    //private REST_API_SERVER_PROD = "http://localhost:8081/cliente";
    private REST_API_SERVER_PROD = "https://godialoginq.herokuapp.com/cliente";

    constructor(private http:HttpClient) { }

    getAll(): Observable<any>{
      return this.http
                .get<any>(this.REST_API_SERVER_DEV)
                .pipe(catchError(this.handleError));
    }

    add(cliente: Cliente): Observable<any>{
      return this.http
                .post<any>(this.REST_API_SERVER_DEV, cliente)
                .pipe(catchError(this.handleError));
    }

    get(idCliente: String): Observable<any>{
      return this.http
                .get<any>(this.REST_API_SERVER_DEV + '/' + idCliente);
    }

    edit(cliente: Cliente): Observable<any>{
      const url = `${this.REST_API_SERVER_DEV}/${cliente["idCliente"]}`;
      return this.http
                .put<any>(url, cliente)
                .pipe(catchError(this.handleError));
    }

    delete(idCliente: string): Observable<any>{
      const url = `${this.REST_API_SERVER_DEV}/${idCliente}`;
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

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse   } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError  } from 'rxjs';
import { Produccion } from '../models/produccion';

@Injectable()
export class ProduccionService {

  private REST_API_SERVER_DEV = "http://localhost/Rafael/Proyectos/Proyectos_Web/semagen-app/semagen-api/public/index.php/api/v1/producciones";
  private REST_API_SERVER_PROD = "http://zirtrex.net/semagen_api/public/index.php/api/v1/producciones";

  constructor(private http:HttpClient) { }

  getProducciones(): Observable<Produccion[]>{
    return this.http
              .get<Produccion[]>(this.REST_API_SERVER_PROD)
              .pipe(catchError(this.handleError));
  }

  agregarProduccion(produccion: Produccion): Observable<any>{
    return this.http
              .post<any>(this.REST_API_SERVER_PROD, produccion)
              .pipe(catchError(this.handleError));
  }

  obtenerProduccion(idProduccion: String): Observable<any>{
    return this.http
              .get<any>(this.REST_API_SERVER_PROD + '/' + idProduccion)
              .pipe(catchError(this.handleError));
  }

  editarProduccion(produccion: Produccion): Observable<any>{
    const url = `${this.REST_API_SERVER_PROD}/${produccion["idProduccion"]}`;
    return this.http
              .put<any>(url, produccion)
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

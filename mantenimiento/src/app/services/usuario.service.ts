import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse  } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, BehaviorSubject, throwError  } from 'rxjs';
import { environment } from '../../environments/environment';
import { JwtResponseI } from '../models/jwt_response';
import { Usuario } from '../models/usuario';

const {
    BACK_PROTOCOL,
    BACK_HOST,
    BACK_PORT
} = environment;

const urlBase =  BACK_PROTOCOL + "://" + BACK_HOST + ":" + BACK_PORT;

@Injectable()
export class UsuarioService {

    private REST_API_SERVER: string = urlBase + "/usuario";
    private loginSubject = new BehaviorSubject(false);
    private token:string;

    constructor(private http:HttpClient) {}

    crear(usuario: Usuario): Observable<JwtResponseI>{
      return this.http
                .post<JwtResponseI>(this.REST_API_SERVER, usuario)
                .pipe(tap(
                  (res: JwtResponseI) => {
                    if (res) {
                      // guardar token
                      this.saveToken(res.usuarioData.accessToken, res.usuarioData.expiresIn);
                    }
                  }
                ), catchError(this.handleError));
    }

    login(usuario: Usuario): Observable<any>{
      return this.http
                .get<any>(this.REST_API_SERVER + '/' + usuario)
                .pipe(tap(
                  (res: JwtResponseI) => {
                    if (res) {
                      // guardar token
                      this.saveToken(res.usuarioData.accessToken, res.usuarioData.expiresIn);
                    }
                  }
                ), catchError(this.handleError));
    }

    logout(): void {
      this.token = '';
      localStorage.removeItem("ACCESS_TOKEN");
      localStorage.removeItem("EXPIRES_IN");
    }

    private saveToken(token: string, expiresIn: string): void {
      localStorage.setItem("ACCESS_TOKEN", token);
      localStorage.setItem("EXPIRES_IN", expiresIn);
      this.token = token;
    }
  
    private getToken(): string {
      if (!this.token) {
        this.token = localStorage.getItem("ACCESS_TOKEN");
      }
      return this.token;
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

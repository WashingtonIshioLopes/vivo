/*import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
}
*/
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private alertService: AlertService) { }

  /*
  router.post('/register', userController.register);
  router.post('/login', userController.login);
  router.get('/whoami', authMiddleware, userController.getUser);
  router.put('/:id', authMiddleware, userController.updateUser);
  router.delete('/:id', authMiddleware, userController.deleteUser);  
  */

  register(cpf: any, email: any, senha: any, nome: any, telefone: any): Observable<any> {

    const body = new HttpParams()
      .set('CPF', cpf)
      .set('Email', email)
      .set('Nome', nome)
      .set('Telefone', telefone)
      .set('Senha', senha);

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(`${this.baseUrl}/usuarios/register`, body.toString(), { headers })
    .pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
      })
    );
  }

  login(cpf: any, senha: any): Observable<any> {

    const body = new HttpParams()
      .set('CPF', cpf)
      .set('Senha', senha);

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(`${this.baseUrl}/usuarios/login`, body.toString(), { headers })
    .pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
      })
    );
  }

  login2(email: any, senha: any): Observable<any> {

    const body = new HttpParams()
      .set('Email', email)
      .set('Senha', senha);

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(`${this.baseUrl}/usuarios/login2`, body.toString(), { headers })
    .pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
      })
    );
  }

  getUser(): Observable<any> {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token ? token : ''
    });    

    return this.http.get(`${this.baseUrl}/usuarios/whoami`, { headers })
    .pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
      })
    );
  }  

  updateUser(idUser:any, user: any): Observable<any> {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token ? token : ''
    });    

    return this.http.put(`${this.baseUrl}/usuarios/${idUser}`, user, { headers })
    .pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
      })
    );
  }
  
  deleteUser(idUser:any): Observable<any> {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token ? token : ''
    });    

    return this.http.delete(`${this.baseUrl}/usuarios/${idUser}`, { headers })
    .pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
      })
    );
  }  

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    this.alertService.error(errorMessage);
    return throwError(errorMessage);
  }  

}

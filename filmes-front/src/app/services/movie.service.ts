/*import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor() { }
}*/

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private alertService: AlertService) { }

  /*
  // Back End
  router.get('/', authMiddleware, filmeController.getAllFilmes);
  router.get('/:id', authMiddleware, filmeController.getFilmeById);
  router.post('/', authMiddleware, filmeController.createFilme);
  router.get('/:idFilme/usuario/:idUsuario', authMiddleware, filmeController.getFilmeByIdAndUserId);
  router.put('/:id', authMiddleware, filmeController.updateFilme);
  router.delete('/:id', authMiddleware, filmeController.deleteFilme);
  */

  getAllFilmes(): Observable<any> {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token ? token : ''
    }); 

    return this.http.get(`${this.baseUrl}/meusfilmes`, { headers })
    .pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
      })
    );
  }

  getFilmeById(idFilme: any): Observable<any> {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token ? token : ''
    });      

    return this.http.get(`${this.baseUrl}/meusfilmes/${idFilme}`, { headers })
    .pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
      })
    );
  }

  createFilme(filme: any): Observable<any> {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token ? token : ''
    });      

    return this.http.post(`${this.baseUrl}/meusfilmes`, filme, { headers })
    .pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
      })
    );
  }
  
  getFilmeByIdAndUserId(idFilme: any, idUsuario: any): Observable<any> {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token ? token : ''
    });      
    
    return this.http.get(`${this.baseUrl}/meusfilmes/${idFilme}/usuario/${idUsuario}`, { headers })
    .pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
      })
    );
  }

  getFilmeByUserId(idUsuario: any): Observable<any> {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token ? token : ''
    });      
    
    return this.http.get(`${this.baseUrl}/meusfilmes/usuario/${idUsuario}`, { headers })
    .pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
      })
    );
  }
  
  updateFilme(tipo: any, movie:any): Observable<any> {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token ? token : ''
    });

    if(tipo == "Assistido"){
      movie.Assistido = movie.Assistido === 1 ? 0 : 1;
    }

    if(tipo == "Favorito"){
      movie.Favorito = movie.Favorito === 1 ? 0 : 1;
    }
    
    if(tipo == "ParaAssistir"){
      movie.PretendeAssistir = movie.PretendeAssistir === 1 ? 0 : 1;
    }    

    return this.http.put(`${this.baseUrl}/meusfilmes/${movie.Id}`, movie, { headers })
    .pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
      })
    );
  }
  
  deleteFilme(idFilme: any): Observable<any> {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token ? token : ''
    }); 

    return this.http.delete(`${this.baseUrl}/meusfilmes/${idFilme}`, { headers })
    .pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
      })
    );
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

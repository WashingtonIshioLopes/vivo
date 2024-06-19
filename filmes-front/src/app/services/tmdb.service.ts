/*import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  constructor() { }
}*/

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private alertService: AlertService) { }

  /*
  // Back End
  router.get('/popular', authMiddleware, tmdbController.getPopularMovies);
  router.get('/top-rated', authMiddleware, tmdbController.getTopRatedMovies);
  router.get('/now_playing', authMiddleware, tmdbController.getNowPlayingMovies);
  router.get('/:movieId/details', authMiddleware, tmdbController.getMovieDetails);
  router.get('/:movieId/images', authMiddleware, tmdbController.getMovieImages);
  router.get('/genres', authMiddleware, tmdbController.getMovieGenres);
  router.get('/search', authMiddleware, tmdbController.getMoviesByFilter);
  */  

  getPopularMovies(): Observable<any> {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token ? token : ''
    });    

    return this.http.get(`${this.baseUrl}/filmes/popular`, { headers })
    .pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
      })
    );
  }

  getTopRatedMovies(): Observable<any> {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token ? token : ''
    });    

    return this.http.get(`${this.baseUrl}/filmes/top-rated`, { headers })
    .pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
      })
    );
  }

  getNowPlayingMovies(): Observable<any> {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token ? token : ''
    });

    return this.http.get(`${this.baseUrl}/filmes/now_playing`, { headers })
    .pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
      })
    );
  }

  getUpCommingMovies(): Observable<any> {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token ? token : ''
    });

    return this.http.get(`${this.baseUrl}/filmes/upcomming`, { headers })
    .pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
      })
    );
  }  
  
  getMovieDetails(idTmdb: any): Observable<any> {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token ? token : ''
    });    

    return this.http.get(`${this.baseUrl}/filmes/${idTmdb}/details`, { headers })
    .pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
      })
    );
  }
  
  getMovieImages(idTmdb: any): Observable<any> {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token ? token : ''
    });    

    return this.http.get(`${this.baseUrl}/filmes/${idTmdb}/images`, { headers })
    .pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
      })
    );
  }
  
  getMovieGenres(): Observable<any> {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token ? token : ''
    });    

    return this.http.get(`${this.baseUrl}/filmes/genres`, { headers })
    .pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
      })
    );
  }

  getMovieLangs(): Observable<any> {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token ? token : ''
    });    

    return this.http.get(`${this.baseUrl}/filmes/langs`, { headers })
    .pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
      })
    );
  }
  
  getMoviesByFilter(filters:any): Observable<any> {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token ? token : ''
    });    

    let params = new HttpParams();
    if (filters.adult !== undefined) params = params.append('adult', filters.adult);
    if (filters.original_language) params = params.append('original_language', filters.original_language);
    if (filters.original_title) params = params.append('original_title', filters.original_title);
    if (filters.title) params = params.append('title', filters.title);
    if (filters.release_date) params = params.append('release_date', filters.release_date);    

    return this.http.get(`${this.baseUrl}/filmes/search`, { headers, params })
    .pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
      })
    );
  }  

  getMovieById(idFilme: any): Observable<any> {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token ? token : ''
    });    

    return this.http.get(`${this.baseUrl}/filmes/${idFilme}`, { headers })
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
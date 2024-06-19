/*import { Component } from '@angular/core';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent {

}*/

import { Component, OnInit } from '@angular/core';
import { Router, Params  } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MovieService } from '../../services/movie.service';
import { TmdbService } from '../../services/tmdb.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  tipoSelecionado: any = "todos";
  movies: any[] = [];
  user: any;
  mymovie: { IdUsuario: any, IdFilme: any, Favorito: any, Assistido: any, PretendeAssistir: any, Status:any } = { IdUsuario: "" , IdFilme: "", Favorito:"", Assistido:"", PretendeAssistir:"", Status:""};

  constructor(private authService: AuthService, private movieService: MovieService, private tmdbService: TmdbService, private alertService: AlertService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {

    this.authService.getUser().subscribe(
      data => {
        this.user = data;
      },
      error => {
        console.error('getUser error', error);
      }
    );

    this.loadAllMovies();

  }

  loadAllMovies(){
    this.tmdbService.getPopularMovies().subscribe(
      data => {       
        this.movies = [...this.movies, ...data];
      },
      error => {
        console.error('Error fetching movies', error);
      }
    );

    this.tmdbService.getTopRatedMovies().subscribe(
      data => {       
        this.movies = [...this.movies, ...data];
      },
      error => {
        console.error('Error fetching movies', error);
      }
    );

    this.tmdbService.getNowPlayingMovies().subscribe(
      data => {       
        this.movies = [...this.movies, ...data];
      },
      error => {
        console.error('Error fetching movies', error);
      }
    );

    this.tmdbService.getUpCommingMovies().subscribe(
      data => {       
        this.movies = [...this.movies, ...data];
      },
      error => {
        console.error('Error fetching movies', error);
      }
    );

    // Todo:
    // Falta Implementar
    /*
    for (const item of this.movies) {
      this.movieService.getFilmeById(item.IdFilme).subscribe(
        data => {
          // OK          
        },
        error => {
          console.error('updateFilme error', error);
        }
      );
    }*/    
  }

  loadPopularMovies(){
    this.tmdbService.getPopularMovies().subscribe(
      data => {       
        this.movies = [...this.movies, ...data];
      },
      error => {
        console.error('Error fetching movies', error);
      }
    );
    // Todo:
    // Falta Implementar
    /*
    for (const item of this.movies) {
      this.movieService.getFilmeById(item.IdFilme).subscribe(
        data => {
          // OK          
        },
        error => {
          console.error('updateFilme error', error);
        }
      );
    }*/    
  }

  loadEmExibicaoMovies(){
    this.tmdbService.getNowPlayingMovies().subscribe(
      data => {       
        this.movies = [...this.movies, ...data];
      },
      error => {
        console.error('Error fetching movies', error);
      }
    );
    // Todo:
    // Falta Implementar
    /*
    for (const item of this.movies) {
      this.movieService.getFilmeById(item.IdFilme).subscribe(
        data => {
          // OK          
        },
        error => {
          console.error('updateFilme error', error);
        }
      );
    }*/    
  }  

  loadBrevementeMovies(){
    this.tmdbService.getUpCommingMovies().subscribe(
      data => {       
        this.movies = [...this.movies, ...data];
      },
      error => {
        console.error('Error fetching movies', error);
      }
    );
    // Todo:
    // Falta Implementar
    /*
    for (const item of this.movies) {
      this.movieService.getFilmeById(item.IdFilme).subscribe(
        data => {
          // OK          
        },
        error => {
          console.error('updateFilme error', error);
        }
      );
    }*/    
  }  
  
  loadMelhorClassificacaoMovies(){
    this.tmdbService.getTopRatedMovies().subscribe(
      data => {       
        this.movies = [...this.movies, ...data];
      },
      error => {
        console.error('Error fetching movies', error);
      }
    );
    // Todo:
    // Falta Implementar
    /*
    for (const item of this.movies) {
      this.movieService.getFilmeById(item.IdFilme).subscribe(
        data => {
          // OK          
        },
        error => {
          console.error('updateFilme error', error);
        }
      );
    }*/    
  }

  getMovieImage(path: string): string {
    return `https://image.tmdb.org/t/p/original/${path}`;
  }

  viewDetails(id: number): void {
    this.router.navigate(['/movie-details', id]);
  }

  markAsWatched(movie: any): void {
    movie.assistido = !movie.assistido;
    this.markTheMovie("Assistido", movie)
  }

  markAsFavorite(movie: any): void {
    movie.favorito = !movie.favorito;
    this.markTheMovie("Favorito", movie)
  }

  markAsWantToWatch(movie: any): void {
    movie.pretendido = !movie.pretendido;
    this.markTheMovie("PretendeAssistir", movie)
  }

  markTheMovie(mark: any, movie:any){
    this.movieService.getFilmeByIdAndUserId(movie.id, this.user.Id).subscribe(
      data => {

        if(data == null){

          this.mymovie.IdUsuario = this.user.Id;
          this.mymovie.IdFilme = movie.id;
          this.mymovie.Favorito = (mark == "Favorito" ? 1 : 0);
          this.mymovie.Assistido =  (mark == "Assistido" ? 1 : 0);
          this.mymovie.PretendeAssistir =  (mark == "PretendeAssistir" ? 1 : 0);
          this.mymovie.Status = "ativo";

          this.movieService.createFilme(this.mymovie).subscribe(
            data => {
              // OK
            },
            error => {
              console.error('updateFilme error', error);
            }
          );

        }
        else{

          this.mymovie = data;

          this.movieService.updateFilme(mark, this.mymovie).subscribe(
            data => {
              // OK
            },
            error => {
              console.error('updateFilme error', error);
            }
          );
        }
      },
      error => {
        console.error('getFilmeByIdAndUserId error', error);
      }
    );
  }

  onSubmit() {

    this.movies = [];

    if(this.tipoSelecionado == "todos"){
      this.loadAllMovies();
    }

    if(this.tipoSelecionado == "populares"){
      this.loadPopularMovies();
    }

    if(this.tipoSelecionado == "em_exibicao"){
      this.loadEmExibicaoMovies();
    }

    if(this.tipoSelecionado == "brevemente"){
      this.loadBrevementeMovies();
    }

    if(this.tipoSelecionado == "melhor_classificacao"){
      this.loadMelhorClassificacaoMovies();
    }
  }

  meusFavoritos(){

    this.movies = [];

    this.movieService.getFilmeByUserId(this.user.Id).subscribe(
      data => {
        for (const item of data) {          
          // Todo
          // Washington - Tinha que melhorar esta parte
          // Pool na API
          this.tmdbService.getMovieById(item.IdFilme).subscribe(
            dataTemp => {  
             if((item.Favorito == 1) || (item.Assistido == 1) || (item == 1)){
               this.movies.push(dataTemp);
             }
              
            },
            error => {
              console.error('Error fetching movies', error);
            }
          );                    
        }
      },
      error => {
        console.error('updateFilme error', error);
      }
    ); 
  }

}

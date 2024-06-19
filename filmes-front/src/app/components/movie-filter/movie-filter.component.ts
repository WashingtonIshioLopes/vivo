/*import { Component } from '@angular/core';

@Component({
  selector: 'app-movie-filter',
  templateUrl: './movie-filter.component.html',
  styleUrls: ['./movie-filter.component.css']
})
export class MovieFilterComponent {

}*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { AlertService } from '../../services/alert.service';
import { TmdbService } from '../../services/tmdb.service';

@Component({
  selector: 'app-movie-filter',
  templateUrl: './movie-filter.component.html',
  styleUrls: ['./movie-filter.component.css']
})
export class MovieFilterComponent implements OnInit {
  movie: any;
  tipoSelecionado: any;
  genres: any[] = []; // Array para armazenar os gêneros de filmes
  langs: any[] = []; // Array para armazenar os gêneros de filmes
  /*
  filters = {
    type: '',
    adult: '',
    language: '',
    title: '',
    releaseDate: ''
  };
  */

  constructor(private movieService: MovieService, private tmdbService: TmdbService, private router: Router) { }

  ngOnInit(): void {

    /*
    this.tmdbService.getMovieGenres().subscribe(
      (data: any) => {
        console.log(data); 
        this.genres = data.genres;
      },
      (error: any) => {
        console.error('Erro ao carregar os gêneros:', error);
      }
    );

    this.tmdbService.getMovieLangs().subscribe(
      (data: any) => {
        console.log(data); 
        this.langs = data;
      },
      (error: any) => {
        console.error('Erro ao carregar os gêneros:', error);
      }
    );
    */
  }

  onSubmit() {
    /*
    this.tmdbService.getMoviesByFilter(this.filters).subscribe(
      (data: any) => {
        // Lógica para lidar com os filmes filtrados
        console.log('Filmes filtrados:', data);
      },
      (error: any) => {
        console.error('Erro ao filtrar os filmes:', error);
      }
    );
    */
    //this.router.navigate(['/movies']);

    this.router.navigate(['/movies'], { queryParams: { pesquisa: this.tipoSelecionado } });

  }

}

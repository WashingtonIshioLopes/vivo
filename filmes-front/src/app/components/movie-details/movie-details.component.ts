/*import { Component } from '@angular/core';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent {

}*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router, Params  } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { TmdbService } from '../../services/tmdb.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movie: any;

  constructor(private route: ActivatedRoute, private movieService: MovieService, private tmdbService: TmdbService, private alertService: AlertService, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.tmdbService.getMovieDetails(id).subscribe(
      data => {
        this.movie = data;
      },
      error => {
        console.error('Error fetching movie details', error);
      }
    );
  }

  getMovieImage(path: string): string {
    //https://image.tmdb.org/t/p/original/path_to_backdrop_image.jpg
    return `https://image.tmdb.org/t/p/original${path}`;
  }

  voltarLista(){
    this.router.navigate(['/movies']);    
  }
}



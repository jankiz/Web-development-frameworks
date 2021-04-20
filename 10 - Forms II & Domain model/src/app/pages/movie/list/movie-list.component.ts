import { Router } from '@angular/router';
import { Movie } from './../../../shared/models/movie.model';
import { FbBaseService } from './../../../services/fb-base.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  title = 'Filmek';
  list: Observable<Movie[]> | null = null;

  constructor(private service: FbBaseService<Movie>, private router: Router) { }

  ngOnInit(): void {
    this.get();
  }

  get(): void {
    this.list = this.service.get('movies');
  }

  onGetMovie(event: Movie): void {
    this.router.navigateByUrl('/details/movie/' + event.id);
  }

}

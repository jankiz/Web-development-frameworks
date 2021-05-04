import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from './../../../shared/models/movie.model';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  @Input() movie: Movie = {} as any;
  @Input() hasAction = true;
  @Output() callFav = new EventEmitter<Movie>();
  @Output() getMovie = new EventEmitter<Movie>();

  constructor() { }

  ngOnInit(): void {
  }

  toggleStar(event: any): void {
    event.stopPropagation();
    this.movie.star = !this.movie.star;
    this.callFav.emit(this.movie);
  }

}

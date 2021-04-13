import { Movie } from './../../../shared/models/movie.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorite-card',
  templateUrl: './favorite-card.component.html',
  styleUrls: ['./favorite-card.component.scss']
})
export class FavoriteCardComponent implements OnInit {
  @Input() favorite: Movie = {} as any;

  constructor() { }

  ngOnInit(): void {
  }

}

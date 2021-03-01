import { Component, OnDestroy, OnInit } from '@angular/core';
import { MOVIES } from './../../shared/database/movie.database';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  movies = MOVIES;
  // tslint:disable-next-line: whitespace
  category?= '';

  constructor() { }

  ngOnInit(): void {
    this.category = 'movie';
  }

  ngOnDestroy(): void {
    delete this.category;
  }

}

import { GAMES } from './../../shared/database/game.database';
import { CATEGORIES } from './../../shared/database/category.database';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MOVIES } from './../../shared/database/movie.database';
import { MatDialog } from '@angular/material/dialog';
import { GameAddComponent } from '../game/add/game-add.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  categories = CATEGORIES;
  movies = MOVIES;
  games = GAMES;
  // tslint:disable-next-line: whitespace
  category?= '';
  page = 'details';

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.category = '';
  }

  ngOnDestroy(): void {
    delete this.category;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(GameAddComponent, {});
    // tslint:disable-next-line: deprecation
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.title) {
        this.movies.push(result);
      }
    });
  }

}

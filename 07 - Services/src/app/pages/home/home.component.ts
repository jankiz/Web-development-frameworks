import { Game } from './../../shared/models/game.model';
import { Movie } from './../../shared/models/movie.model';
import { GAMES } from './../../shared/database/game.database';
import { CATEGORIES } from './../../shared/database/category.database';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MOVIES } from './../../shared/database/movie.database';
import { MatDialog } from '@angular/material/dialog';
import { GameAddComponent } from '../game/add/game-add.component';
import { FbBaseService } from './../../services/fb-base.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  categories = CATEGORIES;
  movies = MOVIES;
  games: Observable<Game[]> | null = null;
  favorites: Movie[] = [];
  // tslint:disable-next-line: whitespace
  category?= '';
  page = 'home';
  detailData: any;

  constructor(private dialog: MatDialog, private service: FbBaseService) { }

  ngOnInit(): void {
    this.category = '';
    this.getGames();
  }

  ngOnDestroy(): void {
    delete this.category;
  }

  getGames(): void {
    this.games = this.service.get('games');
  }

  onSelect(event: string): void {
    this.category = event;
  }

  onFavorite(event: Movie): void {
    if (event?.star) {
      this.favorites.push(event);
    }
    this.favorites = this.favorites.filter(item => item.star);
  }

  goToDetails(event: Movie | Game): void {
    this.detailData = event;
    this.page = 'details';
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(GameAddComponent, {});
    // tslint:disable-next-line: deprecation
    dialogRef.afterClosed().subscribe((game: Game) => {
      console.log(game);
      if (game?.title) {
        this.service.add('games', game);
      }
    }, err => {
      console.warn(err);
    });
  }

}

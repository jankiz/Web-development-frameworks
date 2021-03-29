import { FbBaseService } from './../../../services/fb-base.service';
import { Game } from './../../../shared/models/game.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { GameAddComponent } from '../add/game-add.component';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {
  title = 'Játékok';
  list: Observable<Game[]> | null = null;

  constructor(private service: FbBaseService<Game>, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.get();
  }

  get(): void {
    this.list = this.service.get('games');
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

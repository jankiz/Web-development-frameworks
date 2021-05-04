import { Game } from './../../../shared/models/game.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit {
  @Input() game?: Game;

  constructor() { }

  ngOnInit(): void {
  }

}

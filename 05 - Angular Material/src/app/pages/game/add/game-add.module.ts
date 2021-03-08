import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameAddComponent } from './game-add.component';

@NgModule({
  declarations: [GameAddComponent],
  imports: [
    CommonModule
  ],
  exports: [GameAddComponent],
})
export class GameAddModule { }

import { MovieCardModule } from './../../movie/card/movie-card.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteCardComponent } from './favorite-card.component';

@NgModule({
  declarations: [FavoriteCardComponent],
  imports: [
    CommonModule, MovieCardModule
  ],
  exports: [FavoriteCardComponent]
})
export class FavoriteCardModule { }

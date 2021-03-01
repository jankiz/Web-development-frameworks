import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from './movie-card.component';

@NgModule({
  declarations: [MovieCardComponent],
  imports: [
    CommonModule, MatCardModule
  ],
  exports: [MovieCardComponent]
})
export class MovieCardModule { }

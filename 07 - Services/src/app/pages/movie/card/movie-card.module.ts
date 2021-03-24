import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from './movie-card.component';

@NgModule({
  declarations: [MovieCardComponent],
  imports: [
    CommonModule, MatCardModule, MatIconModule, MatButtonModule
  ],
  exports: [MovieCardComponent]
})
export class MovieCardModule { }

import { ContainerModule } from './../../../shared/components/container/container.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MovieListRoutingModule } from './movie-list-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieListComponent } from './movie-list.component';
import { MovieCardModule } from '../card/movie-card.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [MovieListComponent],
  imports: [
    CommonModule, MovieListRoutingModule, MatToolbarModule, ContainerModule, MovieCardModule,
    MatProgressSpinnerModule
  ]
})
export class MovieListModule { }

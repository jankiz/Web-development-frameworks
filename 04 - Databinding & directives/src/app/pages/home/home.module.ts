import { OnHoverModule } from './../../shared/directives/on-hover/on-hover.module';
import { MovieCardModule } from './../movie/card/movie-card.module';
import { SplashScreenModule } from './../splash-screen/splash-screen.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule, FormsModule, SplashScreenModule, MovieCardModule, OnHoverModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }

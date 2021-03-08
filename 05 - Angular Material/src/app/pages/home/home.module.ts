import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DetailsModule } from './../details/details.module';
import { NavModule } from './../nav/nav.module';
import { RegistrationModule } from './../registration/registration.module';
import { LoginModule } from './../login/login.module';
import { GameCardModule } from './../game/card/game-card.module';
import { FavoriteCardModule } from './../favorite/card/favorite-card.module';
import { OnHoverModule } from './../../shared/directives/on-hover/on-hover.module';
import { MovieCardModule } from './../movie/card/movie-card.module';
import { SplashScreenModule } from './../splash-screen/splash-screen.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule, FormsModule, SplashScreenModule, MovieCardModule, OnHoverModule, FavoriteCardModule,
    GameCardModule, LoginModule, RegistrationModule, NavModule,
    DetailsModule, MatButtonModule, MatIconModule,
    MatDialogModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }

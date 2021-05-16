import { NavModule } from './../nav/nav.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    HomeRoutingModule, CommonModule, NavModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }

import { CATEGORIES } from './../../shared/database/category.database';
import { Component } from '@angular/core';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss']
})
export class SplashScreenComponent {
  categories = CATEGORIES;

  constructor() { }
}

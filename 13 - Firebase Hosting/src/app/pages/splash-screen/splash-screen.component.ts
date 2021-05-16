import { CATEGORIES } from './../../shared/database/category.database';
import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss']
})
export class SplashScreenComponent {
  categories = CATEGORIES;
  today = new Date();
  pi = 3.14159265359;

  constructor(private datePipe: DatePipe) {
    console.log(this.datePipe.transform(this.today));
  }
}

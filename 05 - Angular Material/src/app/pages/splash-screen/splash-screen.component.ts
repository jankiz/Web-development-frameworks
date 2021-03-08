import { Category } from './../../shared/models/category.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss']
})
export class SplashScreenComponent implements OnInit {
  @Input() categories?: Category[];
  constructor() { }

  ngOnInit(): void {
  }

}

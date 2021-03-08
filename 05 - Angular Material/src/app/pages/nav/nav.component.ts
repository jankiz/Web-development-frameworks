import { Category } from './../../shared/models/category.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  sCategoryTitle?: string;
  @Input() selectedCategory?: string;
  @Input() categories: Category[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}

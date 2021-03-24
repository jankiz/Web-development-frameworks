import { Category } from './../../shared/models/category.model';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnChanges {
  sCategoryTitle?: string;
  @Input() selectedCategory?: string;
  @Input() categories: Category[] = [];
  @Output() callSelectPage = new EventEmitter<string>();
  @Output() callSelectC = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    this.setTitle();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.selectedCategory) {
      this.selectedCategory = changes.selectedCategory.currentValue;
      this.setTitle();
    }
  }

  select(target: string): void {
    this.callSelectC.emit(target);
  }

  setTitle(): void {
    const category =
      this.categories.filter((item) => item.value === this.selectedCategory);
    this.sCategoryTitle =
      category?.[0] ? category[0].title : '';
  }

}

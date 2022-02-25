import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-second-project';
  a: number = 10;
  b: string = '1'
  my_object: any = {};
  my_array: Array<number> = [];

  constructor() {
    this.my_array.push(1);
    this.my_object['myfirstattr'] = 'attr1';
  }

  myFirstFunction() {

  }
}

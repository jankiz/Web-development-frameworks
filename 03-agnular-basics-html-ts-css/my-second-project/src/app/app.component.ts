import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-second-project';

  a: number = 10;
  b: string = '1';
  my_object: any = {};
  my_array: Array <any> = [];

  constructor() {
    this.my_array.push(1);
    this.my_object['myfirstattr'] = 'attr1';
  }

  myFunction() {}
}

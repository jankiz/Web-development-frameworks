import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './shared/menu/menu.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MenuComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'learnflow';

  page = "home"

  changePage(selectedPage: string) {
    this.page = selectedPage;
  }
}

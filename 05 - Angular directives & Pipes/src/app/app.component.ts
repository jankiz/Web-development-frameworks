import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'week-04';
  page = 'main';

  changePage(selectedPage: string) {
    this.page = selectedPage;
  }
}

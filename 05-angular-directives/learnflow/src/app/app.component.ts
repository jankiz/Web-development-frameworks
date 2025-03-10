import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { Task, TasksComponent } from './pages/tasks/tasks.component';
import { CompletedComponent } from './pages/completed/completed.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MenuComponent } from './shared/menu/menu.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent, TasksComponent, CompletedComponent, ProfileComponent, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'learnflow';

  page = "home"

  changePage(selectedPage: string){
    this.page = selectedPage;
  }
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { CompletedComponent } from './pages/completed/completed.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MenuComponent } from './shared/menu/menu.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent, TasksComponent, CompletedComponent, ProfileComponent, MenuComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'learnflow';

  page = "completed"
}

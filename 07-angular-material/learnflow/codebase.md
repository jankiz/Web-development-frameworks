# .editorconfig

```
# Editor configuration, see https://editorconfig.org
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true

[*.ts]
quote_type = single
ij_typescript_use_double_quotes = false

[*.md]
max_line_length = off
trim_trailing_whitespace = false

```

# .gitignore

```
# See https://docs.github.com/get-started/getting-started-with-git/ignoring-files for more about ignoring files.

# Compiled output
/dist
/tmp
/out-tsc
/bazel-out

# Node
/node_modules
npm-debug.log
yarn-error.log

# IDEs and editors
.idea/
.project
.classpath
.c9/
*.launch
.settings/
*.sublime-workspace

# Visual Studio Code
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json
.history/*

# Miscellaneous
/.angular/cache
.sass-cache/
/connect.lock
/coverage
/libpeerconnection.log
testem.log
/typings

# System files
.DS_Store
Thumbs.db

```

# angular.json

```json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "learnflow": {
      "projectType": "application",
      "schematics": {
        "@schematics/angular:component": {
          "style": "scss"
        }
      },
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:application",
          "options": {
            "outputPath": "dist/learnflow",
            "index": "src/index.html",
            "browser": "src/main.ts",
            "polyfills": [
              "zone.js"
            ],
            "tsConfig": "tsconfig.app.json",
            "inlineStyleLanguage": "scss",
            "assets": [
              {
                "glob": "**/*",
                "input": "public"
              }
            ],
            "styles": [
              "@angular/material/prebuilt-themes/azure-blue.css",
              "src/styles.scss"
            ],
            "scripts": []
          },
          "configurations": {
            "production": {
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "500kB",
                  "maximumError": "1MB"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "4kB",
                  "maximumError": "8kB"
                }
              ],
              "outputHashing": "all"
            },
            "development": {
              "optimization": false,
              "extractLicenses": false,
              "sourceMap": true
            }
          },
          "defaultConfiguration": "production"
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "configurations": {
            "production": {
              "buildTarget": "learnflow:build:production"
            },
            "development": {
              "buildTarget": "learnflow:build:development"
            }
          },
          "defaultConfiguration": "development"
        },
        "extract-i18n": {
          "builder": "@angular-devkit/build-angular:extract-i18n"
        },
        "test": {
          "builder": "@angular-devkit/build-angular:karma",
          "options": {
            "polyfills": [
              "zone.js",
              "zone.js/testing"
            ],
            "tsConfig": "tsconfig.spec.json",
            "inlineStyleLanguage": "scss",
            "assets": [
              {
                "glob": "**/*",
                "input": "public"
              }
            ],
            "styles": [
              "@angular/material/prebuilt-themes/azure-blue.css",
              "src/styles.scss"
            ],
            "scripts": []
          }
        }
      }
    }
  }
}

```

# my-aidigest-ignore.txt

```txt
.angular/
.angular/**
.vscode/
node_modules/
dist/
coverage/
e2e/
.angular/cache/
```

# package.json

```json
{
  "name": "learnflow",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test"
  },
  "private": true,
  "dependencies": {
    "@angular/animations": "^19.1.0",
    "@angular/cdk": "^19.2.6",
    "@angular/common": "^19.1.0",
    "@angular/compiler": "^19.1.0",
    "@angular/core": "^19.1.0",
    "@angular/forms": "^19.1.0",
    "@angular/material": "^19.2.6",
    "@angular/platform-browser": "^19.1.0",
    "@angular/platform-browser-dynamic": "^19.1.0",
    "@angular/router": "^19.1.0",
    "rxjs": "~7.8.0",
    "tslib": "^2.3.0",
    "zone.js": "~0.15.0"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^19.1.7",
    "@angular/cli": "^19.1.7",
    "@angular/compiler-cli": "^19.1.0",
    "@types/jasmine": "~5.1.0",
    "jasmine-core": "~5.5.0",
    "karma": "~6.4.0",
    "karma-chrome-launcher": "~3.2.0",
    "karma-coverage": "~2.2.0",
    "karma-jasmine": "~5.1.0",
    "karma-jasmine-html-reporter": "~2.1.0",
    "typescript": "~5.7.2"
  }
}
```

# public\favicon.ico

This is a binary file of the type: Binary

# README.md

```md
# Learnflow

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.7.

## Development server

To start a local development server, run:

\`\`\`bash
ng serve
\`\`\`

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

\`\`\`bash
ng generate component component-name
\`\`\`

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

\`\`\`bash
ng generate --help
\`\`\`

## Building

To build the project run:

\`\`\`bash
ng build
\`\`\`

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

\`\`\`bash
ng test
\`\`\`

## Running end-to-end tests

For end-to-end (e2e) testing, run:

\`\`\`bash
ng e2e
\`\`\`

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

```

# src\app\app.component.html

```html
<!--
<app-menu (selectedPage)="changePage($event)"></app-menu>
@if (page === "home") {
  <div class="home">
    <app-home></app-home>
  </div>
} @else if (page === 'tasks') {
  <app-tasks></app-tasks>
} @else if (page === 'completed') {
  <app-completed></app-completed>
} @else {
  <app-profile></app-profile>
}

<app-menu (selectedPage)="changePage($event)"></app-menu>
@switch (page) {
  @case ('home') {
    <div class="home">
      <app-home></app-home>
    </div>
  }
  @case ('tasks') {
    <app-tasks 
      title="My Learning Tasks" 
    ></app-tasks>
  }
  @case ('completed') {
    <app-completed></app-completed>
  }
  @case ('profile'){
    <app-profile></app-profile>
  }
  @default {
    <h1>Page not found ...</h1>
  }
}
-->
<mat-sidenav-container>
  <mat-sidenav #sidenav>
    <app-menu></app-menu>
  </mat-sidenav>
  <mat-sidenav-content>
    <mat-toolbar>
      <button mat-button (click)="onToggleSidenav(sidenav)">
        <mat-icon>menu</mat-icon>
      </button>
      <div>LearnFlow</div>
      <nav>
        <ul>
          <li><a routerLink="/home">Home</a></li>
          <li><a routerLink="/tasks">Tasks</a></li>
          <li><a routerLink="/completed">Completed Tasks</a></li>
          <li><a routerLink="/profile">Profile</a></li>
        </ul>
    </nav>
    </mat-toolbar>
    <router-outlet />
  </mat-sidenav-content>
</mat-sidenav-container>
```

# src\app\app.component.scss

```scss
nav {
    display: flex;
    justify-content: flex-end;
    width: 100%;
}

ul {
    display: flex;
    list-style: none;
    align-items: center;
    margin-block-start: 0;
    margin-block-end: 0;
    gap: 30px;
}

a {
    text-decoration: none;
    color: white;
    font-size: 25px;
}



```

# src\app\app.component.spec.ts

```ts
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'learnflow' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('learnflow');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, learnflow');
  });
});

```

# src\app\app.component.ts

```ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './shared/menu/menu.component';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MenuComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'learnflow';

  page = "home"
  /*
  changePage(selectedPage: string) {
    this.page = selectedPage;
  }*/

    onToggleSidenav(sidenav: MatSidenav){
      sidenav.toggle();
    }
}

```

# src\app\app.config.ts

```ts
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};

```

# src\app\app.routes.ts

```ts
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CompletedComponent } from './pages/completed/completed.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

export const routes: Routes = [
    // Statikus elérési útvonalak
    { path: 'home', component: HomeComponent },
    // Lazy loading a Tasks komponens
    {
        path: 'tasks',
        loadComponent: () => import('./pages/tasks/tasks.component').then(m => m.TasksComponent),
    },
    { path: 'completed', component: CompletedComponent },

    { path: 'profile', component: ProfileComponent },

    // Paraméterezett útvonalak
    // { path: 'task-edit/:id', component: TaskEditComponent },

    // Üres elérési út - alapértelmezett útvonal
    { path: '', redirectTo: 'home', pathMatch: 'full' },

    // Wildcard útvonal - ha egyik útvonal sem egyezik
    //{ path: '**', component: HomeComponent }
    { path: '**', component: PageNotFoundComponent },

    // Útvonalak egymásba ágyazása
    /*
    {
        path: 'tasks',
        title: 'Tasks',
        component: TasksComponent,
        children: [
            { path: 'completed', component: CompletedComponent },
        ]
    },
    */
];
```

# src\app\pages\completed\completed.component.html

```html
<div class="container">
    <div class="directive-demo">
        <h3>Angular Attribútum Direktívák</h3>
        
        <!-- ngModel -->
        <div class="demo-section">
            <h4>ngModel direktíva</h4>
            <p>Task name filter: <input type="text" [(ngModel)]="filterText" placeholder="Search tasks..."></p>
            <p class="description">Current value: {{filterText}}</p>
        </div>
        
        <!-- ngClass -->
        <div class="demo-section">
            <h4>ngClass direktíva</h4>
            <p>Choose a table style:</p>
            <div class="button-group">
                <button (click)="selectedTheme = 'light'" [ngClass]="{'active': selectedTheme === 'light'}">Light</button>
                <button (click)="selectedTheme = 'dark'" [ngClass]="{'active': selectedTheme === 'dark'}">Dark</button>
                <button (click)="selectedTheme = 'colorful'" [ngClass]="{'active': selectedTheme === 'colorful'}">Colorful</button>
            </div>
        </div>
        
        <!-- ngStyle -->
        <div class="demo-section">
            <h4>ngStyle direktíva</h4>
            <p>Task text size:</p>
            <input type="range" [(ngModel)]="fontSize" min="12" max="20" step="1">
            <span [ngStyle]="{'font-size.px': fontSize}">Sample text ({{fontSize}}px)</span>
        </div>
        
        <!-- Pipe -->
        <div class="demo-section">
            <h4>Custom DateFormatter Pipe</h4>
            <p>Original date: 2025-03-01T14:30:00Z</p>
            <p>Formatted date: {{'2025-03-01T14:30:00Z' | dateFormatter}}</p>
        </div>
    </div>
    
    <div class="header">
        <h2>Completed Learning Tasks</h2>
        <button class="clear-button" [ngClass]="{'danger-button': completedTasks.length > 1}">Clear All</button>
    </div>
    
    <table [ngClass]="selectedTheme">
        <thead>
            <tr>
                <th>Task</th>
                <th>Completion Date</th>
                <th>Time Spent</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="let task of completedTasks">
                <td class="completed-task" [ngStyle]="{'font-size.px': fontSize}">{{task.name}}</td>
                <td>{{task.date | dateFormatter}}</td>
                <td>{{task.time}}</td>
                <td><a href="#" class="delete-link">Delete</a></td>
            </tr>
        </tbody>
    </table>
</div>
```

# src\app\pages\completed\completed.component.scss

```scss
.container {
    max-width: 800px;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

h2 {
    margin: 0;
    color: #333;
}

.clear-button {
    background-color: #f1f1f1;
    color: #333;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.3s ease;
}

.danger-button {
    background-color: #f44336;
    color: white;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th {
    text-align: left;
    padding: 12px 15px;
    border-bottom: 1px solid #ddd;
    color: #555;
    font-weight: normal;
}

td {
    padding: 12px 15px;
    border-bottom: 1px solid #eee;
    color: #767676;
}

.completed-task {
    text-decoration: line-through;
    color: #999;
}

.delete-link {
    color: #e53935;
    text-decoration: none;
}

.delete-link:hover {
    text-decoration: underline;
}

/* Directive styles */
.directive-demo {
    margin-bottom: 30px;
    padding: 15px;
    background-color: #f9f9f9;
    border-radius: 6px;
    border: 1px solid #eee;
}

.demo-section {
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px dashed #ddd;
}

.button-group {
    display: flex;
    gap: 10px;
    margin: 10px 0;
}

.button-group button {
    padding: 8px 16px;
    background-color: #eee;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
}

.button-group button.active {
    background-color: #5a4af7;
    color: white;
    border-color: #4a3cd6;
}

table.light {
    background-color: #ffffff;
}

table.dark {
    background-color: #333;
    color: #fff;
}

table.dark th {
    background-color: #444;
    color: #fff;
    border-bottom: 1px solid #555;
}

table.dark td {
    color: #ddd;
    border-bottom: 1px solid #444;
}

table.dark .completed-task {
    color: #aaa;
}

table.dark .delete-link {
    color: #ff8a80;
}

table.colorful th {
    background-color: #5a4af7;
    color: white;
}

table.colorful tr:nth-child(odd) {
    background-color: #f0f8ff;
}

table.colorful tr:nth-child(even) {
    background-color: #e6f2ff;
}
```

# src\app\pages\completed\completed.component.spec.ts

```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedComponent } from './completed.component';

describe('CompletedComponent', () => {
  let component: CompletedComponent;
  let fixture: ComponentFixture<CompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

```

# src\app\pages\completed\completed.component.ts

```ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DateFormatterPipe } from '../../shared/pipes/date.pipe';

@Component({
  selector: 'app-completed',
  standalone: true,
  imports: [CommonModule, FormsModule, DateFormatterPipe],
  templateUrl: './completed.component.html',
  styleUrl: './completed.component.scss'
})
export class CompletedComponent {
  // ngModel variables
  filterText: string = '';
  fontSize: number = 14;
  
  // ngClass variables
  selectedTheme: 'light' | 'dark' | 'colorful' = 'light';
  
  completedTasks = [
    {
      name: 'Set up development environment',
      date: '2025-03-01T14:30:00Z',  // ISO format with time and timezone
      time: '2 hours'
    },
    {
      name: 'Install Angular CLI',
      date: '2025-02-28T09:15:42Z',
      time: '30 minutes'
    }
  ];
}
```

# src\app\pages\home\home.component.html

```html
<div class="container">
    <h1>Welcome to LearnFlow Todo</h1>
    <p>Track your learning tasks efficiently</p>
    <button class="tasks" (click)="changePage()">View My Tasks</button>
</div>
```

# src\app\pages\home\home.component.scss

```scss
.container {
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 40px 20px;
    text-align: center;
}

h1 {
    color: #333;
    font-size: 36px;
    margin-bottom: 16px;
    font-weight: bold;
}

p {
    color: #666;
    font-size: 20px;
    margin-bottom: 40px;
}

.tasks {
    background-color: #5a4af7;
    width: 300px;
    margin: 0 auto;
    color: white;
    border: none;
    border-radius: 15px;
    padding: 12px 30px;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.tasks:hover {
    background-color: #4a3cd6;
}
```

# src\app\pages\home\home.component.spec.ts

```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

```

# src\app\pages\home\home.component.ts

```ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  /* 
  router2: Router
  constructor(private router2: Router){
    this.router2 = router2
  }
  */
              // Paraméter adattag
  constructor(private router: Router) {
  }

  changePage() {
    this.router.navigateByUrl("/tasks");
  }
}

```

# src\app\pages\profile\profile.component.html

```html
<div class="container">
    <select #chosenProfile (change)="reload(chosenProfile.selectedIndex)">
        @for (profile of ProfileObject; track $index) {
            <option value="{{$index}}">{{profile.id}}</option>
        }
    </select>
    
    <h2>User Profile</h2>
    
    <div class="profile-header">
        <div class="avatar">{{ProfileObject[selectedIndex].avatar}}</div>
        <div class="user-info">
            <div class="user-name">{{ProfileObject[selectedIndex].user_name}}</div>
            <div class="user-email">{{ProfileObject[selectedIndex].email}}</div>
        </div>
    </div>
    
    <h2>Task Statistics</h2>
    
    <table class="stats-table">
        <tr>
            <th>Metric</th>
            <th>Value</th>
        </tr>
        <tr>
            <td>Total Tasks</td>
            <td>{{ProfileObject[selectedIndex].tasks.total}}</td>
        </tr>
        <tr>
            <td>Completed Tasks</td>
            <td>{{ProfileObject[selectedIndex].tasks.completed}}</td>
        </tr>
        <tr>
            <td>Pending Tasks</td>
            <td>{{ProfileObject[selectedIndex].tasks.pending}}</td>
        </tr>
        <tr>
            <td>Completion Rate</td>
            <td>{{(ProfileObject[selectedIndex].tasks.completed / ProfileObject[selectedIndex].tasks.total * 100).toFixed(2)}}%</td>
        </tr>
    </table>
</div>
```

# src\app\pages\profile\profile.component.scss

```scss
.container {
    max-width: 700px;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
}

h2 {
    margin: 0 0 20px 0;
    color: #333;
    font-size: 20px;
    font-weight: bold;
}

.profile-header {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
}

.avatar {
    width: 60px;
    height: 60px;
    background-color: #e8eaf6;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: #3f51b5;
    margin-right: 15px;
}

.user-info {
    display: flex;
    flex-direction: column;
}

.user-name {
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 5px;
}

.user-email {
    color: #666;
    font-size: 14px;
}

.stats-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
}

.stats-table th, .stats-table td {
    padding: 12px 15px;
    text-align: left;
}

.stats-table th {
    background-color: #f9f9f9;
    color: #555;
    font-weight: normal;
}

.stats-table tr:nth-child(odd) td {
    background-color: #ffffff;
}

.stats-table tr:nth-child(even) td {
    background-color: #f9f9f9;
}

.stats-value {
    text-align: right;
}
```

# src\app\pages\profile\profile.component.spec.ts

```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

```

# src\app\pages\profile\profile.component.ts

```ts
import { Component, OnInit } from '@angular/core';
import { ProfileObject } from '../../shared/constant';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  // Eredeti profileObject tömb
  ProfileObject = ProfileObject;
  
  // A kiválasztott profil indexe
  selectedIndex: number = 0;

  ngOnInit(): void {
    // Kezdeti index beállítása
    this.selectedIndex = 0;
  }

  reload(index: number): void {
    // Az index beállítása a kiválasztott option alapján
    this.selectedIndex = index;
  }
}
```

# src\app\pages\tasks\task-item\task-item.component.html

```html
<tr>
    <td><input type="checkbox" [checked]="task.completed" (change)="toggleComplete()"></td>
    <td [class.completed]="task.completed">{{ task.name }}</td>
    <td><span class="priority" [ngClass]="task.priority.toLowerCase()">{{ task.priority }}</span></td>
    <td>{{ task.dueDate }}</td>
    <td><a href="#" class="edit-link">Edit</a></td>
  </tr>
```

# src\app\pages\tasks\task-item\task-item.component.scss

```scss
.completed {
    text-decoration: line-through;
    color: #888;
  }
```

# src\app\pages\tasks\task-item\task-item.component.spec.ts

```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskItemComponent } from './task-item.component';

describe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

```

# src\app\pages\tasks\task-item\task-item.component.ts

```ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../tasks.component';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss'
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() complete = new EventEmitter<Task>();

  toggleComplete(): void {
    this.complete.emit(this.task);
  }
}
```

# src\app\pages\tasks\tasks.component.html

```html
<div class="container">
    <div class="header">
        <h2>{{ title }}</h2>
        <div class="input-group">
            <input type="text" placeholder="Add new learning task..." [(ngModel)]="newTaskName">
            <select [(ngModel)]="newTaskPriority">
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
            <button (click)="addTask()">Add</button>
        </div>
    </div>
    
    <table>
        <thead>
            <tr>
                <th>Status</th>
                <th>Task</th>
                <th>Priority</th>
                <th>Due Date</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @for (task of tasks; track trackById($index, task)) {
                <tr>
                    <td><input type="checkbox" [checked]="task.completed" (change)="toggleTaskCompletion(task)"></td>
                    <td [class.completed]="task.completed">{{ task.name }}</td>
                    <td><span class="priority {{ task.priority.toLowerCase() }}">{{ task.priority }}</span></td>
                    <td>{{ task.dueDate }}</td>
                    <td><a href="#" class="edit-link">Edit</a></td>
                </tr>
            }
        </tbody>
    </table>
</div>
```

# src\app\pages\tasks\tasks.component.scss

```scss
.container {
    max-width: 800px;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  h2 {
    margin: 0;
    color: #333;
    font-family: serif;
    font-weight: normal;
  }
  
  .input-group {
    display: flex;
    gap: 10px;
  }
  
  input[type="text"] {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    flex-grow: 1;
    min-width: 200px;
  }
  
  select {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  button {
    background-color: #5a4af7;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th {
    text-align: left;
    padding: 12px 15px;
    border-bottom: 1px solid #ddd;
    color: #555;
    font-weight: normal;
  }
  
  td {
    padding: 12px 15px;
    border-bottom: 1px solid #eee;
    color: #767676;
  }
  
  .priority {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 12px;
    color: white;
  }
  
  .high {
    background-color: #f44336;
  }
  
  .medium {
    background-color: #ff9800;
  }
  
  .low {
    background-color: #4caf50;
  }
  
  .edit-link {
    color: #5a4af7;
    text-decoration: none;
  }
  
  .edit-link:hover {
    text-decoration: underline;
  }
  
  .completed {
    text-decoration: line-through;
    color: #999;
  }
```

# src\app\pages\tasks\tasks.component.spec.ts

```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksComponent } from './tasks.component';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

```

# src\app\pages\tasks\tasks.component.ts

```ts
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface Task {
  id: number;
  name: string;
  completed: boolean;
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
}

@Component({
  selector: 'app-tasks',
  imports: [FormsModule, CommonModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
  standalone: true
})
export class TasksComponent implements OnInit {
  @Input() title: string = 'Learning Tasks';
  @Output() taskAdded = new EventEmitter<Task>();
  
  newTaskName: string = '';
  newTaskPriority: 'High' | 'Medium' | 'Low' = 'Medium';
  
  tasks: Task[] = [
    {
      id: 1,
      name: 'Complete Angular basics tutorial',
      completed: false,
      priority: 'High',
      dueDate: new Date().toISOString()
    },
    {
      id: 2,
      name: 'Practice component creation',
      completed: false,
      priority: 'Medium',
      dueDate: new Date().toISOString()
    },
    {
      id: 3,
      name: 'Read documentation on directives',
      completed: false,
      priority: 'Medium',
      dueDate: new Date().toISOString()
    }
  ];

  ngOnInit(): void {
    this.tasks = this.tasks.map(task => {
      const date = new Date();
      date.setDate(date.getDate() + 2);
      return {
        ...task,
        dueDate: date.toISOString()
      };
    });
  }

  addTask(): void {
    if (this.newTaskName.trim()) {
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 2);
      
      const newTask: Task = {
        id: this.tasks.length + 1,
        name: this.newTaskName.trim(),
        completed: false,
        priority: this.newTaskPriority,
        dueDate: dueDate.toISOString()
      };
      
      this.tasks.push(newTask);
      this.taskAdded.emit(newTask);
      this.newTaskName = '';
    }
  }

  toggleTaskCompletion(task: Task): void {
    task.completed = !task.completed;
  }

  trackById(index: number, item: Task): number {
    return item.id;
  }
}
```

# src\app\shared\constant.ts

```ts
export const ProfileObject = [
    {
      'id': 'OQyRttOV418',
      'user_name': 'John Doe',
      'user_url': 'https://unsplash.com/@johndoe?utm_source=unsample',
      'photo_url': 'https://unsplash.com/photos/OQyRttOV418?utm_source=unsample',
      'email': 'john.doe@example.com',
      'avatar': 'J',
      'tasks': {
        'total': 10,
        'completed': 8,
        'pending': 2
      }
    },
    {
      'id': '5XP-n_Xqqv8',
      'user_name': 'Jane Smith',
      'user_url': 'https://unsplash.com/@janesmith?utm_source=unsample',
      'photo_url': 'https://unsplash.com/photos/5XP-n_Xqqv8?utm_source=unsample',
      'email': 'jane.smith@example.com',
      'avatar': 'J',
      'tasks': {
        'total': 7,
        'completed': 3,
        'pending': 4
      }
    },
    {
      'id': 'Shf_B7x8qDA',
      'user_name': 'Robert Johnson',
      'user_url': 'https://unsplash.com/@robertj?utm_source=unsample',
      'photo_url': 'https://unsplash.com/photos/Shf_B7x8qDA?utm_source=unsample',
      'email': 'robert.j@example.com',
      'avatar': 'R',
      'tasks': {
        'total': 15,
        'completed': 9,
        'pending': 6
      }
    },
    {
      'id':'LFAhbzmvpak',
      'user_name': 'Sarah Wilson',
      'user_url': 'https://unsplash.com/@sarahwilson?utm_source=unsample',
      'photo_url': 'https://unsplash.com/photos/LFAhbzmvpak?utm_source=unsample',
      'email': 's.wilson@example.com',
      'avatar': 'S',
      'tasks': {
        'total': 5,
        'completed': 2,
        'pending': 3
      }
    },
  {
      'id': 'eFXho78pQH8',
      'user_name': 'Michael Brown',
      'user_url': 'https://unsplash.com/@michaelb?utm_source=unsample',
      'photo_url': 'https://unsplash.com/photos/eFXho78pQH8?utm_source=unsample',
      'email': 'm.brown@example.com',
      'avatar': 'M',
      'tasks': {
        'total': 12,
        'completed': 7,
        'pending': 5
      }
    }
];
```

# src\app\shared\menu\menu.component.html

```html
<!--
<nav>
    <ul>
      <li><a routerLink="/home">Home</a></li>
      <li><a routerLink="/tasks">Tasks</a></li>
      <li><a routerLink="/completed">Completed Tasks</a></li>
      <li><a routerLink="/profile">Profile</a></li>
    </ul>
</nav>
-->
<mat-nav-list>
  <a mat-list-item routerLink="/home">
    <mat-icon matListItemIcon>home</mat-icon>
    <span matListItemTitle>Home</span>
  </a>
  <a mat-list-item routerLink="/tasks">
    <mat-icon matListItemIcon>assignment</mat-icon>
    <span matListItemTitle>Tasks</span>
  </a>
  <a mat-list-item routerLink="/completed">
    <mat-icon matListItemIcon>done_all</mat-icon>
    <span matListItemTitle>Completed Tasks</span>
  </a>
  <a mat-list-item routerLink="/profile">
    <mat-icon matListItemIcon>person</mat-icon>
    <span matListItemTitle>Profile</span>
  </a>
</mat-nav-list>
```

# src\app\shared\menu\menu.component.scss

```scss
nav {
    background-color: rgb(7, 4, 156);
    width: 100%;
}


ul {
    display: flex;
    list-style: none;
    font-weight: bold;
    align-items: center;
    margin-block-start: 0;
    margin-block-end: 0;
    gap: 200px;
    height: 40px;
}

a {
    text-decoration: none;
    color: white;
    font-size: 20px;
}


```

# src\app\shared\menu\menu.component.spec.ts

```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

```

# src\app\shared\menu\menu.component.ts

```ts
import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list'
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-menu',
  imports: [
    RouterLink,
    MatListModule,
    MatIcon
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit, AfterViewInit{

  @Output() selectedPage: EventEmitter<string> = new EventEmitter();

  constructor(){
    console.log("construtor called");
  }

  ngOnInit(): void {
    console.log("ngOnInit called");
  }

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit called");
  }

  menuSwitch(pageValue: string) {
    this.selectedPage.emit(pageValue);
  }

}

```

# src\app\shared\page-not-found\page-not-found.component.html

```html
<h1>Page Not Found</h1>
<button [routerLink]="['/home']" routerLinkActive="active" >Back To Home</button>
```

# src\app\shared\page-not-found\page-not-found.component.scss

```scss
h1 {
    text-align: center;
}
```

# src\app\shared\page-not-found\page-not-found.component.spec.ts

```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotFoundComponent } from './page-not-found.component';

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageNotFoundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

```

# src\app\shared\page-not-found\page-not-found.component.ts

```ts
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  imports: [RouterLink],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent {

}

```

# src\app\shared\pipes\date.pipe.spec.ts

```ts
import { DatePipe } from './date.pipe';

describe('DatePipe', () => {
  it('create an instance', () => {
    const pipe = new DatePipe();
    expect(pipe).toBeTruthy();
  });
});

```

# src\app\shared\pipes\date.pipe.ts

```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatter',
  standalone: true
})
export class DateFormatterPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    try {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        return value;
      }
      
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      
      return `${year}-${month}-${day}`;
    } catch (error) {
      return value;
    }
  }
}
```

# src\index.html

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Learnflow</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</head>
<body class="mat-typography">
  <app-root></app-root>
</body>
</html>

```

# src\main.ts

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

```

# src\styles.scss

```scss
@use '@angular/material' as mat;

:root {
  @include mat.toolbar-overrides((
    container-background-color: #5a4af7,
    container-text-color: white,
  ));
}

/* You can add global styles to this file, and also import other style files */
body {
    margin: 0 !important;
}
html, body { height: 100%; }
body { margin: 0; font-family: Roboto, "Helvetica Neue", sans-serif; }


```

# tsconfig.app.json

```json
/* To learn more about Typescript configuration file: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html. */
/* To learn more about Angular compiler options: https://angular.dev/reference/configs/angular-compiler-options. */
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "types": []
  },
  "files": [
    "src/main.ts"
  ],
  "include": [
    "src/**/*.d.ts"
  ]
}

```

# tsconfig.json

```json
/* To learn more about Typescript configuration file: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html. */
/* To learn more about Angular compiler options: https://angular.dev/reference/configs/angular-compiler-options. */
{
  "compileOnSave": false,
  "compilerOptions": {
    "outDir": "./dist/out-tsc",
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "moduleResolution": "bundler",
    "importHelpers": true,
    "target": "ES2022",
    "module": "ES2022"
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  }
}

```

# tsconfig.spec.json

```json
/* To learn more about Typescript configuration file: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html. */
/* To learn more about Angular compiler options: https://angular.dev/reference/configs/angular-compiler-options. */
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/spec",
    "types": [
      "jasmine"
    ]
  },
  "include": [
    "src/**/*.spec.ts",
    "src/**/*.d.ts"
  ]
}

```


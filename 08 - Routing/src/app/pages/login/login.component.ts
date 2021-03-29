import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private router: Router) { }

  navTo(url: string): void {
    this.router.navigateByUrl(url);
  }

  login(): void {
    this.navTo('/home');
  }
}

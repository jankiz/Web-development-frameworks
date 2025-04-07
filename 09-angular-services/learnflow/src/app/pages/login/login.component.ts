import { Component, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { FakeLoadingService } from '../../shared/services/fake-loading.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy{
  email = new FormControl('');
  password = new FormControl('');
  isLoading: boolean = false;
  loginError: string = '';
  showLoginForm: boolean = true;
  loadingSubscription?: Subscription;

  constructor(private loadingService: FakeLoadingService, private router: Router) { }


  // PROMISE login
  login() {
    this.loginError = '';

    if (this.email.value === 'test@gmail.com' && this.password.value === 'testpw') {
      this.isLoading = true;
      this.showLoginForm = false;

      localStorage.setItem('isLoggedIn', 'true');

      this.loadingService.loadingWithPromise().then((data: number) => {
        if (data === 3) {
          window.location.href = '/home';
        }
      }).catch(error => {
        console.error(error);
        this.isLoading = false;
        this.showLoginForm = true;
        this.loginError = 'Loading error occurred!';
      }).finally(() => {
        console.log("This executed finally!")
      });
    } else {
      this.loginError = 'Invalid email or password!';
    }
  }

  login2() {
    const emailValue = this.email.value || '';
    const passwordValue = this.password.value || '';

    this.isLoading = true;
    this.showLoginForm = false;
    this.loginError = '';


    this.loadingService.loadingWithPromise2(emailValue, passwordValue).then((_: boolean) => {
      console.log("This executed second!");
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigateByUrl('/home');
    }).catch(error => {
      this.isLoading = false;
      this.showLoginForm = true;
      this.loginError = 'Invalid email or password!';
      console.error(error);
    }).finally(() => {
      console.log("This executed finally!");
    });

    console.log("This executed first!");
  }

  // async-await
  async login3() {
    const emailValue = this.email.value || '';
    const passwordValue = this.password.value || '';
    try {
      // then
      const bool = await this.loadingService.loadingWithPromise3(emailValue, passwordValue);
      console.log(bool, "This executed second!");
      this.isLoading = true;
      this.showLoginForm = false;
      this.router.navigateByUrl('/home');
      localStorage.setItem('isLoggedIn', 'true');
      // catch
    } catch (error) {
      console.error(error)
    }
    // finally
    console.log("This executed finally!");
  }

  // OBSERVABLE login
  login4() {
    const emailValue = this.email.value || '';
    const passwordValue = this.password.value || '';
    // memory leak
    this.loadingSubscription = this.loadingService.loadingWithObservable2(emailValue, passwordValue).subscribe((data: boolean)=>{
      console.log(data);
    });
  }

  ngOnDestroy() {
    this.loadingSubscription?.unsubscribe;
  }
}
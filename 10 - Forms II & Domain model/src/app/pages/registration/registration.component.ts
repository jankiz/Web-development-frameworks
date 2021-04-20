import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl(),
    email: new FormControl('', [Validators.required, Validators.email]),
    password1: new FormControl('', [Validators.minLength(6), Validators.required]),
    password2: new FormControl('', [Validators.minLength(6), Validators.required]),
  });

  error = false;

  constructor(private router: Router) { }

  registration(): void {
    this.error = false;
    if (this.form.valid) {
      if (this.form.value.password1 === this.form.value.password2) {
        console.log(this.form.value);
        this.router.navigateByUrl('/login');
        return;
      }
    }
    this.error = true;
  }
}

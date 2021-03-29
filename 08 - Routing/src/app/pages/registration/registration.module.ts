import { RegistrationRoutingModule } from './registration-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';

@NgModule({
  declarations: [RegistrationComponent],
  imports: [
    CommonModule, RegistrationRoutingModule, MatCardModule, MatButtonModule
  ]
})
export class RegistrationModule { }

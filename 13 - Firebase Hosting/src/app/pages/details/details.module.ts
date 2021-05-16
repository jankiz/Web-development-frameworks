import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DetailsRoutingModule } from './details-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details.component';

@NgModule({
  declarations: [DetailsComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    DetailsRoutingModule, MatCardModule, MatButtonModule, MatIconModule, MatTabsModule, MatFormFieldModule, MatInputModule
  ],
  exports: [DetailsComponent],
})
export class DetailsModule { }

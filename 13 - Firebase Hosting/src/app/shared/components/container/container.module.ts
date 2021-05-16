import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container.component';

@NgModule({
  declarations: [ContainerComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ContainerComponent
  ]
})
export class ContainerModule { }

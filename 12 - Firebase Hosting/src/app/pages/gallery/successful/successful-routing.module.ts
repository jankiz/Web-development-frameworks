import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuccessfulComponent } from './successful.component';

const routes: Routes = [{ path: ':userId', component: SuccessfulComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuccessfulRoutingModule { }

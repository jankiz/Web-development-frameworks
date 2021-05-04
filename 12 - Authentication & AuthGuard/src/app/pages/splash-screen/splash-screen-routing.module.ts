import { SplashScreenComponent } from './splash-screen.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: SplashScreenComponent,
        data: { title: 'Főoldal - Webkert' }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SplashScreenRoutingModule { }

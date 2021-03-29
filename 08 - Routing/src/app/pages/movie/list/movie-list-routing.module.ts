import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './movie-list.component';

const routes: Routes = [
    {
        path: '',
        component: MovieListComponent,
        data: { title: 'Filmek - Webkert' }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MovieListRoutingModule { }

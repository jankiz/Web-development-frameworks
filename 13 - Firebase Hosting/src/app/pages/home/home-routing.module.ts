import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'splash', pathMatch: 'full' },
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: 'splash',
                loadChildren: () => import('./../splash-screen/splash-screen.module').then(m => m.SplashScreenModule),
            },
            {
                path: 'movies',
                loadChildren: () => import('./../movie/list/movie-list.module').then(m => m.MovieListModule),
            },
            {
                path: 'games',
                loadChildren: () => import('./../game/list/game-list.module').then(m => m.GameListModule),
            }
        ],
        canActivateChild: [AuthGuard]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeRoutingModule { }

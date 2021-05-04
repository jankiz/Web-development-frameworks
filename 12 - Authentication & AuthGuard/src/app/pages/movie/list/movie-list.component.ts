import { Router } from '@angular/router';
import { Movie } from './../../../shared/models/movie.model';
import { FbBaseService } from './../../../services/fb-base.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit, OnDestroy {
  title = 'Filmek';
  list: Movie[] | null = null;
  getSub: Subscription | null = null;
  pageState = '';

  constructor(private service: FbBaseService<Movie>, private router: Router) { }

  ngOnInit(): void {
    this.get();
  }

  ngOnDestroy(): void {
    if (this.getSub) {
      this.getSub.unsubscribe();
    }
  }

  get(): void {
    this.pageState = 'loading';
    this.getSub = this.service.get('movies').subscribe(
      result => {
        if (result?.length > 0) {
          this.list = result;
          this.pageState = 'data';
        } else {
          this.pageState = 'noData';
        }
      },
      err => {
        console.log(err);
        this.pageState = '';
      });
  }

  onGetMovie(event: Movie): void {
    this.router.navigateByUrl('/details/movie/' + event.id);
  }

}

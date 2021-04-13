import { Injectable, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, RouterState, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleService implements OnDestroy {

  titleSubscription: Subscription | any;

  constructor(private router: Router, private title: Title) { }

  ngOnDestroy(): void {
    this.titleSubscription.unsubscribe();
  }

  refreshTitle(): void {
    // tslint:disable-next-line: deprecation
    this.titleSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const title = this.getTitle(this.router.routerState, this.router.routerState.root).join('-');
        this.title.setTitle(title);
      }
    });
  }

  getTitle(state: RouterState | any, parent: ActivatedRoute): any[] {
    const data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      data.push(... this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }
}

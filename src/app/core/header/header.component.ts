import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'grd-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isHeaderHidden: boolean;
  routerSubscription: Subscription;

  constructor(private readonly router: Router) { }

  ngOnInit() {
    // hide HeaderComponent when user is on Login page
    this.routerSubscription = this.router.events.pipe(
      filter((event: RouterEvent) => {
        return event instanceof NavigationEnd;
      })
    ).subscribe((event: RouterEvent) => {
      const url = event ? event.url : null;
      this.isHeaderHidden = (url === '/login') ? true : false;
    });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

}

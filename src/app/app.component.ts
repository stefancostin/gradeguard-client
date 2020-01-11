import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'grd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title: string;
  public isHeaderHidden: boolean;

  constructor(private router: Router) {
    this.title = 'gradeguard-client';
  }

  ngOnInit() {
    // hide HeaderComponent when user is on Login page
    this.router.events.pipe(
      filter((event: RouterEvent) => {
        return event instanceof NavigationEnd;
      })
    ).subscribe((event: RouterEvent) => {
      const url = event ? event.url : null;
      this.isHeaderHidden = (url === '/login') ? true : false;
    });
  }

}

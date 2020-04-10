import { Component, OnInit } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import {Router} from '@angular/router';
declare let ga: Function;
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private router: Router) {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
   }

  ngOnInit() {
  }

}

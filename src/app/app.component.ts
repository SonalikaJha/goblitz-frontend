import { environment } from './../environments/environment.prod';
import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

declare let ga: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'goblitz-frontend';

  constructor(private authService: AuthService,
      private router: Router
    ) {
      console.log('env is runjinggggg=>>',environment.baseUrl)
    if(environment.baseUrl == 'http://goblitz.tv:3000/') {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          ga('set', 'page', event.urlAfterRedirects);
          ga('send', 'pageview');
        }
      });
    }
    
  }
}

import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { RouterStateSnapshot, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class AuthGaurdServiceService {

  constructor(private authService: AuthService, 
    private router: Router,
    ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if ( this.authService.isLoggedIn()) {

      return true;
    } else {
      this.router.navigate(['/'], { queryParams: { returnUrl: state.url}});
    console.log('protecting routeeee')
    return false;
    }
    
  }
}

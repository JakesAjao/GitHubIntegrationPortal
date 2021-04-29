import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
    let token = localStorage.getItem('token');

    
    //console.log("Auth guard state.url : "+state.url );

    if (token=="" || token==null) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      
    localStorage.setItem('returnUrl', state.url);
    
    //console.log("setItem state.url : "+localStorage.getItem('returnUrl') );

    return false;
    }

    return true;
  }
  
}
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth-service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  isAdminLoggedIn: boolean = false; 
  isAdminLoggedInSubscription: Subscription | undefined;


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      const isAdmin = this.authService.checkIsAdminLoggedIn()
      console.log('AuthGuard - isAdmin:', isAdmin);
      if(isAdmin) {
        return true
      }
      return this.router.createUrlTree(['/login']);
  }

  ngOnDestroy() {
    if (this.isAdminLoggedInSubscription) {
      this.isAdminLoggedInSubscription.unsubscribe();
    }
  }
}

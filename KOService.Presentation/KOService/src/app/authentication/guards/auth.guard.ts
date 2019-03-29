import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CoreModule } from 'src/app/core/core.module';

@Injectable({
  providedIn: CoreModule
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private authService: AuthService,
    private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const hasGoodRole = next.data.role === this.authService.getCurrentIdentityRole();
    console.log('next.data.role: ');
    console.log(next.data.role);
    console.log('getCurrentIdentityRole: ');
    console.log(this.authService.getCurrentIdentityRole());
    if (this.authService.isAuthenticated() && hasGoodRole) {
        return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const hasGoodRole = next.data.role === this.authService.getCurrentIdentityRole();
    if (this.authService.isAuthenticated() && hasGoodRole) {
        return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

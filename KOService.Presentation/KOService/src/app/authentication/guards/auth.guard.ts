import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CoreModule } from 'src/app/core/core.module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: CoreModule
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const requiredRole = next.data.role;
    const isAuthorized = this.authService.isAuthorized(requiredRole);

    if (!isAuthorized) {
      const isAuthenticated = this.authService.isAuthenticated();
      if (isAuthenticated) {
        this.authService.logout();
      }
      this.router.navigate(['/login']);
    }

    return isAuthorized;
  }
}

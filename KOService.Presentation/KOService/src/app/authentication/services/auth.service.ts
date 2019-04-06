import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/internal/operators';
import { LoginCredentials } from '../models/LoginCredentials';
import { LoginResponse } from '../models/LoginResponse';
import { Role } from 'src/app/shared/enums/Role';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Injectable()
export class AuthService {

  private baseUrl = 'https://localhost:44340/api/login';

  constructor(
    private http: HttpClient,
    private router: Router
    ) {}

  login(credentials: LoginCredentials) {
    return this.http.post<LoginResponse>(this.baseUrl, credentials)
      .pipe(tap(response => {
        localStorage.setItem('auth_token', response.auth_token);
        const decodedToken = jwt_decode(response.auth_token);
        this.router.navigate([decodedToken['role']]);
      })).subscribe();
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  isAuthorized(requiredRole: Role): boolean {

    const token = localStorage.getItem('auth_token');

    if (!token) {
      console.log('User not logged in.');
      return false;
    }

    const decodedToken = jwt_decode(token);

    if (!decodedToken) {
      console.log('Invalid token');
      return false;
    }

    return Role[requiredRole] === decodedToken['role'];
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.router.navigate(['/login']);
  }
}

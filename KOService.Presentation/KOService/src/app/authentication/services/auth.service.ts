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

  private baseUrl = 'http://localhost:64197/api/login';

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

    console.log('Role[requiredRole]: ' + Role[requiredRole]);
    console.log('decodedToken[\'role\']: ' + decodedToken['role']);
    console.log('requiredRole.toString() === decodedToken[\'role\']: ' + Role[requiredRole] === decodedToken['role']);
    return Role[requiredRole] === decodedToken['role'];
  }
}

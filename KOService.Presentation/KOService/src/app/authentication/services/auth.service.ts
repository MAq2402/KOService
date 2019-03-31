import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/internal/operators';
import { LoginCredentials } from '../models/LoginCredentials';
import { LoginResponse } from '../models/LoginResponse';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { Role } from 'src/app/shared/enums/Role';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

  private baseUrl = 'http://localhost:64197/api/login';

  constructor(
    private http: HttpClient,
    private jwtHelperService: JwtHelperService,
    private router: Router
    ) {}

  login(credentials: LoginCredentials) {
    return this.http.post<LoginResponse>(this.baseUrl, credentials)
      .pipe(tap(response => {
        localStorage.setItem('auth_token', response.auth_token);
        console.log(response.auth_token);
        const decodedToken = this.jwtHelperService.decodeToken(response.auth_token);
        console.log(decodedToken);
        console.log('Role[decodedToken[\'role\']]: ' + Role[decodedToken['role']]);
        console.log('decodedToken[\'role\']: ' + decodedToken['role']);
        this.router.navigate([decodedToken['role']]);
      })).subscribe(res => console.log(res));
  }

  isAuthorized(requiredRole: Role): boolean {

    const token = localStorage.getItem('auth_token');

    if (!token) {
      console.log('User not logged in.');
      return false;
    }

    const decodedToken = this.jwtHelperService.decodeToken(token);

    if (!decodedToken) {
      console.log('Invalid token');
      return false;
    }

    console.log('requiredRole.toString(): ' + requiredRole.toString());
    console.log('Role[decodedToken[\'role\']]: ' + Role[decodedToken['role']]);
    return requiredRole.toString() === Role[decodedToken['role']];
  }
}

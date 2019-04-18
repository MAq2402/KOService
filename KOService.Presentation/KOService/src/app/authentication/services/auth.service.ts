import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, map } from 'rxjs/internal/operators';
import { LoginCredentials } from '../models/LoginCredentials';
import { LoginResponse } from '../models/LoginResponse';
import { Role } from 'src/app/shared/enums/Role';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { Employee } from 'src/app/shared/models/employee.model';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { throwError, Observable, of } from 'rxjs';

@Injectable()
export class AuthService {

  private baseUrl = 'https://localhost:44340/api/';


  private currentEmployee: Employee = null;


  constructor(
    private http: HttpClient,
    private router: Router,
    private spinnerService: NgxSpinnerService
    ) {
      if (this.isAuthenticated() && this.currentEmployee === null) {
        this.getCurrentEmployee().subscribe();
      }
    }

  getCurrentEmployee(): Observable<Employee> {
    if (this.currentEmployee) {
      return of(this.currentEmployee);
    } else {
      const identityId = localStorage.getItem('identity_id');
      return this.http.get<Employee>(this.baseUrl + 'user/' + identityId).pipe(map(employee => this.currentEmployee = employee));
    }
  }

  login(credentials: LoginCredentials) {
    this.spinnerService.show();
    return this.http.post<LoginResponse>(this.baseUrl + 'login', credentials)
      .pipe(
        tap(response => {
          localStorage.setItem('auth_token', response.auth_token);
          localStorage.setItem('identity_id', response.id);
          this.getCurrentEmployee().subscribe();
          const decodedToken = jwt_decode(response.auth_token);
          this.router.navigate([decodedToken['role']]);
          this.spinnerService.hide();
        }),
        catchError(error => {
          this.spinnerService.hide();
          return throwError(error);
        })
      ).subscribe();
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
    localStorage.removeItem('identity_id');
    this.router.navigate(['/login']);
  }
}

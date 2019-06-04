import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, map } from 'rxjs/internal/operators';
import { LoginCredentials } from '../models/LoginCredentials';
import { LoginResponse } from '../models/LoginResponse';
import { Role } from 'src/app/shared/enums/Role';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { Employee } from 'src/app/shared/models/employee.model';
import { throwError, Observable, of } from 'rxjs';
import { SpinnerService } from 'src/app/core/services/spinner.service';

const EMPLOYEE_ROLE = 'employee_role';
const AUTH_TOKEN = 'auth_token';
const IDENTITY_ID = 'identity_id';

@Injectable()
export class AuthService {

  private baseUrl = 'https://localhost:44340/api/';


  private currentEmployee: Employee = null;


  constructor(
    private http: HttpClient,
    private router: Router,
    private spinnerService: SpinnerService
    ) {
      if (this.isAuthenticated() && this.currentEmployee === null) {
        this.getCurrentEmployee().subscribe();
      }
    }

  getCurrentEmployee(): Observable<Employee> {
    if (this.currentEmployee) {
      return of(this.currentEmployee);
    } else {
      const identityId = localStorage.getItem(IDENTITY_ID);
      return this.http.get<Employee>(this.baseUrl + 'user/' + identityId).pipe(map(employee => this.currentEmployee = employee));
    }
  }

  login(credentials: LoginCredentials) {
    this.spinnerService.show(); /*hide in getData() methods of:
                                      admin/home/home.component,
                                      manager/home/home.component,
                                      mechanic/home/activities/activities.component*/
    return this.http.post<LoginResponse>(this.baseUrl + 'login', credentials)
      .pipe(
        tap(response => {
          localStorage.setItem(AUTH_TOKEN, response.auth_token);
          localStorage.setItem(IDENTITY_ID, response.id);
          this.getCurrentEmployee().subscribe();
          const decodedToken = jwt_decode(response.auth_token);
          this.router.navigate([decodedToken[EMPLOYEE_ROLE]]);
        }),
        catchError(error => {
          return throwError(error);
        })
      ).subscribe();
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(AUTH_TOKEN);
  }

  isAuthorized(requiredRole: Role): boolean {

    const token = localStorage.getItem(AUTH_TOKEN);

    if (!token) {
      console.log('User not logged in.');
      return false;
    }

    const decodedToken = jwt_decode(token);

    if (!decodedToken) {
      console.log('Invalid token');
      return false;
    }

    return Role[requiredRole] === decodedToken[EMPLOYEE_ROLE];
  }

  logout() {
    localStorage.removeItem(AUTH_TOKEN);
    localStorage.removeItem(IDENTITY_ID);
    this.currentEmployee = null;
    this.router.navigate(['/login']);
  }
}

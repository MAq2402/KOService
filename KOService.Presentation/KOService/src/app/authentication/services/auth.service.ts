import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/internal/operators';
import { LoginCredentials } from '../models/LoginCredentials';
import { LoginResponse } from '../models/LoginResponse';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { Role } from 'src/app/shared/enums/Role';
import { Router } from '@angular/router';
// import { CoreModule } from 'src/app/core/core.module';

@Injectable(/*{
  providedIn: 'root'
}*/)
export class AuthService {

  static singletonInstance: AuthService;

  private baseUrl = 'http://localhost:64197/api/login';

  private currentIdentityRole: Role;

  constructor(
    private http: HttpClient,
    private employeeService: EmployeeService,
    private router: Router
    ) {
      if (!AuthService.singletonInstance) {
        // construct object
        console.log('AuthService created again.');
        AuthService.singletonInstance = this;
       } else {
        console.log('AuthService created.');
       }
       return AuthService.singletonInstance;
    }

  login(credentials: LoginCredentials) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json-patch+json',
     })
    };
    return this.http.post<LoginResponse>(this.baseUrl, credentials, httpOptions)
      .pipe(tap(response => {
        localStorage.setItem('auth_token', response.auth_token);
        this.employeeService.getEmployeeByIdentityId(response.id)
        .pipe(tap(currentIdentity => {
          localStorage.setItem('current-identity-id', currentIdentity.id);
          this.currentIdentityRole = currentIdentity.identityRole;
          console.log('ROLE: ' + this.getCurrentIdentityRole());
          this.router.navigate([Role[currentIdentity.identityRole]]);
        })).subscribe();
      }));
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  /*
  TO DO: Sprawdzić czy to się odświeza dla różnych USERów - ewentualnie pokombinować z providerami
  */
  getCurrentIdentityRole(): Role {
    return this.currentIdentityRole;
  }
}

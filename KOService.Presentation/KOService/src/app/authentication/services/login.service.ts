import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/internal/operators';
import { LoginCredentials } from '../models/LoginCredentials';
import { LoginResponse } from '../models/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:64197/api/login';

  constructor(private http: HttpClient) {}

  /*getEmp(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json-patch+json',
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
     })
    };
    return this.http.get('http://localhost:64197/api/Employees', httpOptions);
  }*/

  login(credentials: LoginCredentials) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json-patch+json',
     })
    };
    return this.http.post<LoginResponse>(this.baseUrl, credentials, httpOptions)
      .pipe(tap(response => {
        console.log(response);
        localStorage.setItem('auth_token', response.auth_token);
      }));
  }
}

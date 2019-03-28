import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { LoginCredentials } from '../models/LoginCredentials';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:64197/api/login';

  constructor(private http: HttpClient) {

  }

  // -H  "accept: application/json" -H  "Content-Type: application/json-patch+json"

  login(credentials: LoginCredentials): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json-patch+json',
        'accept': 'application/json'
     })
    };
    return this.http.post(this.baseUrl, credentials, httpOptions)
      .pipe(map(res => JSON.parse(res.toString())))
      .pipe(
        map(res => {
        console.log(res);
        localStorage.setItem('auth_token', res.auth_token);
        /*this.userService.getCurrentIdentity()
          .pipe(tap(_ => this.spinnerService.hide()))
          .subscribe(user => localStorage.setItem('currentUser', JSON.stringify(user.body)));*/
          return true;
        }),
      );
  }
}

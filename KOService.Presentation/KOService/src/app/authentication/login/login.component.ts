import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoginCredentials } from '../models/LoginCredentials';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('login') loginInput: ElementRef;
  @ViewChild('password') passwordInput: ElementRef;

  loginCredentials: LoginCredentials = {
    userName: '',
    password: ''
  };

  constructor(private authService: AuthService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.authService.logout();
    }
    this.loginInput.nativeElement.focus();
  }

  onSubmit() {
    this.authService.login(this.loginCredentials).subscribe(x => x, err => {
      if (err.status === 400) {
        this.snackBar.open('Podano złe hasło.');
      } else if (err.status === 404) {
        this.snackBar.open('Nie ma takiego użytkownika.');
      } else {
        this.snackBar.open('Logowanie nie powiodło się.');
      }
    });
  }

  focusPasswordInput() {
    this.passwordInput.nativeElement.focus();
  }
}

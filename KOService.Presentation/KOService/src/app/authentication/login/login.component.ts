import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoginCredentials } from '../models/LoginCredentials';
import { AuthService } from '../services/auth.service';

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

  constructor(private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.authService.logout();
    }
    this.loginInput.nativeElement.focus();
  }

  onSubmit() {
    this.authService.login(this.loginCredentials);
  }

  focusPasswordInput() {
    this.passwordInput.nativeElement.focus();
  }
}

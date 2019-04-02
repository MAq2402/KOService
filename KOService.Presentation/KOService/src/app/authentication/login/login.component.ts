import { Component, OnInit } from '@angular/core';
import { LoginCredentials } from '../models/LoginCredentials';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginCredentials: LoginCredentials = {
    userName: '',
    password: ''
  };

  constructor(private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.authService.logout();
    }
  }

  onSubmit() {
    this.authService.login(this.loginCredentials);
  }

}

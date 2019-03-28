import { Component, OnInit } from '@angular/core';
import { LoginCredentials } from '../models/LoginCredentials';
import { LoginService } from '../services/login.service';

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

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.loginService.login(this.loginCredentials).subscribe(
      response => {console.log('Successfully logged in.');},
      error => {console.log(error); }
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { Router } from '@angular/router';
import { Role } from 'src/app/shared/enums/Role';
import { NavbarButton } from './models/NavbarButton';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

    navButtons: NavbarButton [] = [
      {'text': 'Test1', 'redirectTo': 'admin', 'alignedToRight': false, 'isIcon': false },
      {'text': 'Test2', 'redirectTo': 'admin', 'alignedToRight': false, 'isIcon': false },
      {'text': 'mood', 'redirectTo': 'manager', 'alignedToRight': true, 'isIcon': true, 'tooltip': 'Dodaj coś tam' },
      {'text': 'Test4', 'redirectTo': 'admin', 'alignedToRight': true, 'isIcon': false }
    ]

  ngOnInit() {
  }

  isUserLogged() {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
  }

  redirectToHomePage() {
    this.router.navigate([Role[this.authService.currentEmployee.identityRole]]);
  }

  getCurrentEmployee() {
    return this.authService.currentEmployee;
  }

}

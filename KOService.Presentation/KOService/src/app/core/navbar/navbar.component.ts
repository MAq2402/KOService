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
    ) {}

    adminNavbarButtons: NavbarButton [] = [
      {'text': 'add_circle', 'redirectTo': 'admin/add', 'alignedToRight': true, 'isIcon': true, 'tooltip': 'Dodaj pracownika' },
    ];

    managerNavbarButtons: NavbarButton [] = [
      {'text': 'add_box', 'redirectTo': 'manager/addRepair', 'alignedToRight': true, 'isIcon': true, 'tooltip': 'Dodaj naprawę' },
    ];

    mechanicNavbarButtons: NavbarButton [] = [];

  ngOnInit() {
    console.log("core container");
  }

  isUserLogged() {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
  }

  redirectToHomePage() {
    this.router.navigate([Role[this.authService.currentEmployee.identityEmployeeRole]]);
  }

  getCurrentEmployee() {
    return this.authService.currentEmployee;
  }

  getNavbarButtons() {
    switch (this.authService.currentEmployee.identityEmployeeRole) {
      case Role.admin: return this.adminNavbarButtons;
      case Role.manager: return this.managerNavbarButtons;
      case Role.mechanic: return this.mechanicNavbarButtons;
    }
  }

}

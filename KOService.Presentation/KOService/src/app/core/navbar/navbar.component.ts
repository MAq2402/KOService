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

    adminNavbarButton: NavbarButton [] = [
      {'text': 'add_circle', 'redirectTo': 'admin', 'alignedToRight': true, 'isIcon': true, 'tooltip': 'Dodaj pracownika' },
    ];

    managerNavbarButton: NavbarButton [] = [
      {'text': 'add_box', 'redirectTo': 'manager', 'alignedToRight': true, 'isIcon': true, 'tooltip': 'Dodaj naprawę' },
    ];

    mechanicNavbarButton: NavbarButton [] = [];

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

 currentIdentityLoaded() {
   if (this.authService.currentEmployee) {
     return true;
   } else {
     return false;
   }
 }

  getNavbarButtons() {
    switch(this.authService.currentEmployee.identityRole){
      case Role.admin: return this.adminNavbarButton;
      case Role.manager: return this.managerNavbarButton;
      case Role.mechanic: return this.mechanicNavbarButton;
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { Router } from '@angular/router';
import { Role } from 'src/app/shared/enums/Role';
import { NavbarButton } from './models/NavbarButton';
import { Employee } from 'src/app/shared/models/employee.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentEmployee: Employee;

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
      this.authService.getCurrentEmployee().subscribe(employee => this.currentEmployee = employee);
  }

  isUserLogged() {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
  }

  redirectToHomePage() {
    this.router.navigate([Role[this.currentEmployee.role]]);
  }

  getNavbarButtons() {
    switch (this.currentEmployee.role) {
      case Role.admin: return this.adminNavbarButtons;
      case Role.manager: return this.managerNavbarButtons;
      case Role.mechanic: return this.mechanicNavbarButtons;
    }
  }

}

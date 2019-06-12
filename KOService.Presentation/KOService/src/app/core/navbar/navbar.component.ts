import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { Router } from '@angular/router';
import { Role } from 'src/app/shared/enums/Role';
import { NavbarButton } from './models/NavbarButton';
import { Employee } from 'src/app/shared/models/employee.model';
import { RolePipe } from 'src/app/shared/pipes/role.pipe';
import { SpinnerService } from '../services/spinner.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [RolePipe]
})
export class NavbarComponent implements OnInit {

    currentEmployee: Employee;

  constructor(
    private authService: AuthService,
    private router: Router,
    private rolePipe: RolePipe,
    private spinnerService: SpinnerService
    ) {}

    adminNavbarButtons: NavbarButton[] = [
        { 'text': 'add_circle', 'redirectTo': 'admin/add-employee', 'alignedToRight': true, 'isIcon': true, 'tooltip': 'Dodaj pracownika' },
    ];

    managerNavbarButtons: NavbarButton[] = [
        { 'text': 'add_box', 'redirectTo': 'manager/addRepair', 'alignedToRight': true, 'isIcon': true, 'tooltip': 'Dodaj naprawę' },
    ];

    mechanicNavbarButtons: NavbarButton[] = [];

  transformRole(role: Role): string {
    return this.rolePipe.transform(role);
  }

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
    let navbarButtonsToReturn = null;
    switch (this.currentEmployee.role) {
      case Role.admin: navbarButtonsToReturn = this.adminNavbarButtons; break;
      case Role.manager: navbarButtonsToReturn = this.managerNavbarButtons; break;
      case Role.mechanic: navbarButtonsToReturn = this.mechanicNavbarButtons; break;
    }
    return navbarButtonsToReturn;
  }

}

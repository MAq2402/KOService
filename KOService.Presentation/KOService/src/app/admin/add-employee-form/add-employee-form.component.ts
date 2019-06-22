import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Role } from '../../shared/enums/Role';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { RegisterEmployee } from 'src/app/shared/models/register.model';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { EditEmployeeService } from 'src/app/shared/services/editEmployee.service';

@Component({
    selector: 'app-add-employee-form',
    templateUrl: './add-employee-form.component.html',
    styleUrls: ['./add-employee-form.component.css']
})

export class AddEmployeeFormComponent implements OnInit {
    registerSubscription: Subscription;
    editMode : boolean;
    roles = Role;
    rolesPolish = [
        "Mechanik",
        "Manager",
        "Administrator"
    ];
    chosenPolishRole : string;
    keys: any[];
    register: RegisterEmployee = {
        firstName: '',
        lastName: '',
        userName: '',
        employeeRole: Role.mechanic,
        password: '',
        confirmPassword: ''
    }

    @ViewChild('firstName') firstName: ElementRef;
    @ViewChild('lastName') lastName: ElementRef;

    mapPolishRoleToEnglish = function (role: string) {
        switch (role) {
            case this.rolesPolish[0]: return Role.mechanic;
            case this.rolesPolish[1]: return Role.manager;
            case this.rolesPolish[2]: return Role.admin;
            default: return Role.mechanic;
        }
    }

    constructor(private service: EmployeeService,
        private router: Router,
        private spinnerService: SpinnerService,
        private editEmployeeService: EditEmployeeService) {
        this.keys = Object.keys(Role).filter(k => !isNaN(Number(k)));
    }

    ngOnInit() {
        this.resolveInputData();
        this.spinnerService.hide();
        this.firstName.nativeElement.focus();
    }

    private fetchEmployeeModel(): RegisterEmployee {
      const model = {
        password: this.register.password,
        confirmPassword: this.register.confirmPassword,
        firstName: this.register.firstName,
        lastName: this.register.lastName,
        userName: this.register.userName,
        employeeRole: this.mapPolishRoleToEnglish(this.chosenPolishRole),
      };
      return model;
    }

    addEmployee() {
      this.spinnerService.show();
      const employeeModel = this.fetchEmployeeModel();
      this.service.addEmployee(employeeModel).subscribe(() => {
        this.router.navigate(['/admin']);
        this.spinnerService.hide();
      });
    }

    editEmployee() {
      this.spinnerService.show();
      const employeeModel = this.fetchEmployeeModel();
      this.service.updateEmployee(this.editEmployeeService.employee.id, employeeModel).subscribe(() => {
        this.spinnerService.hide();
        this.router.navigate(['/admin']);
      });
    }

    changeEmployeePassword() {
      const passwordModel = {
        currentPassword: '',
        newPassword: this.register.password
      };
      this.service.changeEmployeePassword(this.register.userName, passwordModel).subscribe(() => {
        this.spinnerService.hide();
        this.router.navigate(['/admin']);
      });
    }

    resolveInputData() {
        if (this.editEmployeeService.employee) {
            this.editMode = true;
            this.service.getEmployee(this.editEmployeeService.employee.id).subscribe(res => {
                this.register = {
                    firstName: res.firstName,
                    lastName: res.lastName,
                    userName: res.userName,
                    password: '',
                    confirmPassword: '',
                    employeeRole: this.editEmployeeService.employee.role,
                }
                this.chosenPolishRole = this.rolesPolish[this.register.employeeRole];
            });
        }
        else {
            this.editMode = false;
            this.register = {
                firstName: '',
                lastName: '',
                userName: '',
                password: '',
                confirmPassword: '',
                employeeRole: Role.mechanic
            };
        }
    }
}

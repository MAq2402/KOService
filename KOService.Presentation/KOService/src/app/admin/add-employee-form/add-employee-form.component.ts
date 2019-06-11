import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Role } from '../../shared/enums/Role';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { RegisterEmployee } from 'src/app/shared/models/register.model';

@Component({
    selector: 'app-add-employee-form',
    templateUrl: './add-employee-form.component.html',
    styleUrls: ['./add-employee-form.component.css']
})

export class AddEmployeeFormComponent implements OnInit {
    registerSubscription: Subscription;
    roles = Role;
    chosenPolishRole = "Mechanik";
    rolesPolish = [
        "Mechanik",
        "Manager",
        "Administrator"
    ];
    keys: any[];

    register: RegisterEmployee = {
        firstName: '',
        lastName: '',
        userName: '',
        password: '',
        confirmPassword: '',
        employeeRole: Role.mechanic
    };


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

    constructor(private service: EmployeeService, private router: Router) {
        this.keys = Object.keys(Role).filter(k => !isNaN(Number(k)));
    }

    ngOnInit() {
        this.firstName.nativeElement.focus();
    }

    onSubmit() {
        const model = {
            password: this.register.password,
            confirmPassword: this.register.confirmPassword,
            firstName: this.register.firstName,
            lastName: this.register.lastName,
            userName: this.register.userName,
            employeeRole: this.mapPolishRoleToEnglish(this.chosenPolishRole),
        };

        this.service.addEmployee(model).subscribe(() => {
            this.router.navigate(['/admin']);
        });
    }
}

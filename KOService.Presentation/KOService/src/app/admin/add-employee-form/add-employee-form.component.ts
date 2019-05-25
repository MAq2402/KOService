import { Component, ViewChild, ElementRef, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../../shared/enums/Role';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { RegisterEmployee } from 'src/app/shared/models/register.model';

@Component({
    selector: 'app-add-employee-form',
    templateUrl: './add-employee-form.component.html',
    styleUrls: ['./add-employee-form.component.css']
})
export class AddEmployeeFormComponent implements OnInit {
    roles = Role;
    keys: any[];

    @ViewChild('firstName') firstName: ElementRef;
    @ViewChild('lastName') lastName: ElementRef;

    register: RegisterEmployee = {
        firstName: '',
        lastName: '',
        userName: '',
        password: '',
        confirmPassword: '',
        employeeRole: Role.mechanic,
        identityId: ''
    };

    constructor(private service: EmployeeService, private router: Router, private zone: NgZone) {
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
            employeeRole: this.register.employeeRole,
            identityId: "xd"
        }

        this.service.addEmployee(model).subscribe(result => {this.zone.run(() => this.router.navigate(['/admin']))});
    }
}

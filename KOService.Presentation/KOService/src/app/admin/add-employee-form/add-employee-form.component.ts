import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Employee } from '../../shared/models/employee.model';
import { Role } from '../../shared/enums/Role';
import { EmployeeService } from 'src/app/shared/services/employee.service';

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

    employee: Employee = {
        firstName: '',
        lastName: '',
        id: '',
        role: Role.mechanic
    };

    constructor(private service: EmployeeService) {
        this.keys = Object.keys(Role).filter(k => !isNaN(Number(k)));
    }

    ngOnInit() {
        this.firstName.nativeElement.focus();
    }

    onSubmit() {
        console.log("wszedl");
        const model = {
            password: "123",
            confirmPassword: "123",
            firstName: "kuba",
            lastName: "kuba",
            userName: "adminaKuba",
            employeeRole: 2,
            identityId: "string"
        }

        this.service.addEmployee(model).subscribe();
    }

}

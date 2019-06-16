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
    chosenPolishRole = "Mechanik";
    rolesPolish = [
        "Mechanik",
        "Manager",
        "Administrator"
    ];
    keys: any[];
    register: RegisterEmployee;

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
        if (this.editEmployeeService) {            
            this.editMode = true;
            console.log(this.editEmployeeService.employee.firstName + " " + this.editEmployeeService.employee.lastName);
            console.log('id: ' + this.editEmployeeService.employee.id);
            let response = this.service.getEmployee(this.editEmployeeService.employee.id).subscribe(res => {
                console.log(JSON.stringify(res));
                this.register = {
                    firstName: res.firstName,
                    lastName: res.lastName,
                    userName: res.userName,
                    password: '',
                    confirmPassword: '',
                    employeeRole: res.role,
                }
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
        this.spinnerService.hide();
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


        this.spinnerService.show();
        if (!this.editMode) { 
            this.service.addEmployee(model).subscribe(() => {
            this.spinnerService.hide();
            this.router.navigate(['/admin']);
            });
        }
        else {
            this.service.updateEmployee(this.editEmployeeService.employee.id, model).subscribe(() => { 
                this.spinnerService.hide();
                this.router.navigate(['/admin']);
            });
        }
    }
}

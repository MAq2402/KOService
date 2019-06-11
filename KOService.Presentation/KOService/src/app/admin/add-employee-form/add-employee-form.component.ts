import { Component, ViewChild, ElementRef, NgZone, OnInit, OnDestroy } from '@angular/core';
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

export class AddEmployeeFormComponent implements OnInit, OnDestroy {
    registerSubscription: Subscription;
    roles = Role;
    chosenPolishRole = "Mechanik";
    rolesPolish = [
        "Mechanik",
        "Manager",
        "Administrator"
    ]
    keys: any[];

    @ViewChild('firstName') firstName: ElementRef;
    @ViewChild('lastName') lastName: ElementRef;

    mapPolishRoleToEnglish = function (role: string) {
        switch(role){
            case this.rolesPolish[0]: return Role.mechanic;//.mechanic;
            case this.rolesPolish[1]: return Role.manager;//.manager;
            case this.rolesPolish[2]: return Role.admin;//.admin;
            default: return Role.mechanic;
        }
    }

    register: RegisterEmployee = {
        firstName: '',
        lastName: '',
        userName: '',
        password: '',
        confirmPassword: '',
        employeeRole: Role.mechanic
    };

    constructor(private service: EmployeeService, private zone: NgZone, private router: Router) {
        this.keys = Object.keys(Role).filter(k => !isNaN(Number(k)));
    }

    ngOnInit() {
        this.firstName.nativeElement.focus();
    }

    ngOnDestroy() {
        
    }

    delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    onSubmit() {
        const model = {
            password: this.register.password,
            confirmPassword: this.register.confirmPassword,
            firstName: this.register.firstName,
            lastName: this.register.lastName,
            userName: this.register.userName,
            employeeRole: this.mapPolishRoleToEnglish(this.chosenPolishRole),
        }

        this.service.addEmployee(model).subscribe(res => {            
            console.log("robie subscriba elo");
        });
    }
}

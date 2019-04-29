import { Component } from '@angular/core';
import { Employee } from '../../shared/models/employee.model';
import { Role } from '../../shared/enums/Role';

@Component({
    selector: 'app-add-employee-form',
    templateUrl: './add-employee-form.component.html',
    styleUrls: ['./add-employee-form.component.css']
})
export class AddEmployeeFormComponent {
    roles = Role;
    keys: any[];

    constructor() {
        this.keys = Object.keys(Role).filter(k => !isNaN(Number(k)));
    }

}

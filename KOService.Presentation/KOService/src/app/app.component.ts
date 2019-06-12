import { Component } from '@angular/core';
import { Employee } from './shared/models/employee.model';
import { EditEmployeeService } from './shared/services/editEmployee.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [EditEmployeeService]
})
export class AppComponent {
    title = 'KOService';

    employeeModel = new Employee();
}

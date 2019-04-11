import { Component } from '@angular/core';
import { Employee } from './shared/models/employee.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'KOService';

    employeeModel = new Employee();
}

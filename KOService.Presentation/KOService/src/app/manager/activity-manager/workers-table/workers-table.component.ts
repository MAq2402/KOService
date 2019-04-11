import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/shared/models/Employee';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { Role } from 'src/app/shared/enums/Role';

@Component({
  selector: 'app-workers-table',
  templateUrl: './workers-table.component.html',
  styleUrls: ['./workers-table.component.css']
})
export class WorkersTableComponent implements OnInit {

  workers: Employee[];
  columnsToDisplay = ['firstName', 'lastName'];
  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.getEmployeesByRole(Role.mechanic).subscribe(
      mechanics => this.workers = mechanics
  );
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Repair } from 'src/app/shared/models/repair.model';
import { RepairStatus } from 'src/app/shared/enums/repair-status.enum';
import { ColumnDef } from 'src/app/shared/models/column-def.model';
import { RepairSubTask } from 'src/app/shared/models/repair-sub-task.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DetailExpandAnimation } from 'src/app/manager/animations/detail-expand-animation';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { Role } from 'src/app/shared/enums/Role';
import { Employee } from 'src/app/shared/models/employee.model';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    DetailExpandAnimation
  ],
})
export class HomeComponent implements OnInit {

  




  employeesDataSource = new MatTableDataSource();
  employees: Employee[];
 
  repairsColumnsToDisplay: ColumnDef[] = [
    { name: 'id', display: 'Id' },
    { name: 'firstName', display: 'Imie' },
    { name: 'lastName', display: 'Nazwisko' },
    { name: 'identityEmployeeRole', display: 'Stanowisko' },
    
  ];

  subTasksColumnsToDisplay: ColumnDef[] = [
    { name: 'phone', display: 'Numer Telefonu' },
    { name: 'email', display: 'Adres Email' },
    { name: 'gender', display: 'Płeć'},
    
  ];

  expandedElement: any | null;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private authService: AuthService,private employeeService: EmployeeService) { }

  ngOnInit() {
   this.employeeService.getEmployeesByRole(Role.mechanic).subscribe(employees => (
     this.employees = employees,this.employeesDataSource = new MatTableDataSource(this.employees),console.log(employees)))
   
    
   
  }

  getRepairsColumnsToDisplayNames(): string[] {
    return this.repairsColumnsToDisplay.map(x => x.name);
  }


  getSubTasksColumnsToDisplayNames(): string[] {
    return this.subTasksColumnsToDisplay.map(x => x.name);
  }

  
}



import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/shared/models/employee.model';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { Role } from 'src/app/shared/enums/Role';
import { Activity } from 'src/app/shared/models/Activity';
import { ActivityService } from 'src/app/shared/services/activity.service';
import { MatTableDataSource } from '@angular/material';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { container } from '@angular/core/src/render3';


export class WorkerActivities {
  worker: Employee;
  activities: Activity[];
  constructor(worker: Employee, activities: Activity[]){
    this.worker = worker;
    this.activities = activities;
  }
 
}

@Component({
  selector: 'app-workers-table',
  templateUrl: './workers-table.component.html',
  styleUrls: ['./workers-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class WorkersTableComponent implements OnInit {

  dataSourceArray =  new MatTableDataSource()
  workers: Employee[];
  workerAcitvitiesTable: WorkerActivities[];
  expandedElement: WorkerActivities | null;
  // Just for now to test nested request to find out if it works
  moqWorkerId = '1';
  columnsToDisplay = ['firstName', 'lastName', 'numberOfActivities'];
  constructor(private employeeService: EmployeeService, private activityService: ActivityService) {
    
    this.workerAcitvitiesTable = new Array<WorkerActivities>();
   }

  ngOnInit() {
    this.employeeService.getEmployees(Role.mechanic).subscribe(
      mechanics =>(this.workers = mechanics,mechanics.map(

        //mechanic => this.activityService.getWorkerActivities(mechanic.id)
        mechanic => (this.activityService.getWorkerActivities(this.moqWorkerId).subscribe(
          mechanicActivities => (
           
            this.workerAcitvitiesTable.push(new WorkerActivities(mechanic,mechanicActivities)),
            console.log(this.workerAcitvitiesTable),
            this.dataSourceArray = new MatTableDataSource(this.workerAcitvitiesTable)

          )
            )
        )))
  );
  
  
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}

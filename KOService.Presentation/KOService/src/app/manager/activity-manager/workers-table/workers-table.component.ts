import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/shared/models/Employee';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { Role } from 'src/app/shared/enums/Role';
import { Activity } from 'src/app/shared/models/Activity';
import { ActivityService } from 'src/app/shared/services/activity.service';

export interface WorkersActivities {
  [workerId: string]: Activity[];
}

@Component({
  selector: 'app-workers-table',
  templateUrl: './workers-table.component.html',
  styleUrls: ['./workers-table.component.css']
})
export class WorkersTableComponent implements OnInit {

  workers: Employee[];
  workersActivities: Map<string,Activity[]>;
  // Just for now to test nested request to find out if it works
  moqWorkerId = '1';
  columnsToDisplay = ['firstName', 'lastName', 'numberOfActivities'];
  constructor(private employeeService: EmployeeService, private activityService: ActivityService) {
    this.workersActivities = new Map<string,Activity[]>();
   }

  ngOnInit() {
    this.employeeService.getEmployeesByRole(Role.mechanic).subscribe(
      mechanics =>(this.workers = mechanics,mechanics.map(

        //mechanic => this.activityService.getWorkerActivities(mechanic.id)
        mechanic => (this.activityService.getWorkerActivities(this.moqWorkerId).subscribe(
          mechanicActivities => (
           this.workersActivities[mechanic.id] = mechanicActivities,
            console.log(this.workersActivities[mechanic.id])
            )
            )
        )))
  );
  
  
  }

}

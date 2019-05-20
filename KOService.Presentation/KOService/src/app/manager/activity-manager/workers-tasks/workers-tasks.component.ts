import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Activity } from 'src/app/shared/models/Activity';
import { ActivityService } from 'src/app/shared/services/activity.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
import {ActivityCreatorComponent} from '../activity-creator/activity-creator.component'
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
import { Employee } from 'src/app/shared/models/employee.model';
import { WorkerActivities } from '../workers-table/workers-table.component';



@Component({
  selector: 'app-workers-tasks',
  templateUrl: './workers-tasks.component.html',
  styleUrls: ['./workers-tasks.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class WorkersTasksComponent implements OnInit {

  //TODO: request id as input
  requestId = '0';
 
  repairActivities: Activity[];
  workers:Employee[] = [{id: "0",firstName: "Alojz",lastName:"Brzechwa",identityEmployeeRole:0, email: "abrzechwa@email.com", phone: "123456789", gender: "male"}];
  assigned:WorkerActivities[] = [];

  columnsToDisplay = ['description', 'type', 'status','worker'];
  name;animal;
  constructor(private activityService: ActivityService,private activityCreatorDialog: MatDialog) { }


  ngOnInit() {
     this.activityService.getRepairActivities(this.requestId).subscribe(activities => this.repairActivities = activities );
  }

  openActivityCreatorDialog(): void{
    const dialogRef = this.activityCreatorDialog.open(ActivityCreatorComponent, {
     
      data: {name: this.name, animal: this.animal}
  });
  
}
drop(event: CdkDragDrop<string[]>) {
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    console.log("move")
  } else {
    transferArrayItem(event.previousContainer.data,
                      event.container.data,
                      event.previousIndex,
                      event.currentIndex);
    console.log(this.assigned);
  }
}
evenPredicate(item: CdkDrag<number>) {
  
 
}
}

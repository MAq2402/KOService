import { Component, OnInit, Input } from '@angular/core';
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
import { ActivatedRoute } from '@angular/router';



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

  repairId: string;
  repairActivities: Activity[];
  
  assigned:WorkerActivities[] = [];

  columnsToDisplay = ['description', 'type', 'status','worker'];
  
  constructor(private activityService: ActivityService,private activityCreatorDialog: MatDialog,private route: ActivatedRoute) { }


  ngOnInit() {
    this.route.params.subscribe(params=>(this.repairId = params['id'],console.log(this.repairId)));
     this.activityService.getRepairActivities(this.repairId).subscribe(activities => this.repairActivities = activities );
  }

  openActivityCreatorDialog(): void{
    const dialogRef = this.activityCreatorDialog.open(ActivityCreatorComponent, {
     data: {repairId: this.repairId}
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

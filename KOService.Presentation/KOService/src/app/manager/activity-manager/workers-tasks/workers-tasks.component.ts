import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Activity } from 'src/app/shared/models/Activity';
import { ActivityService } from 'src/app/shared/services/activity.service';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';



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
  columnsToDisplay = ['description', 'type', 'status', 'worker'];
  constructor(private activityService: ActivityService) { }


  ngOnInit() {
     this.activityService.getRequestActivities(this.requestId).subscribe(activities => this.repairActivities = activities );
  }

}

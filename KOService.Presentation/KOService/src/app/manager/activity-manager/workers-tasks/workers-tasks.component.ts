import { Component, OnInit, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Activity } from 'src/app/shared/models/Activity';
import { ActivityService } from 'src/app/shared/services/activity.service';
import { MatDialog } from '@angular/material';
import { ActivityCreatorComponent } from '../activity-creator/activity-creator.component'
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';
import { SpinnerService } from 'src/app/core/services/spinner.service';
export interface WorkerDto {
  Id: string;
  Name: string;
}
export interface Assignment {
  [activityId: string]: WorkerDto;
}

@Component({
  selector: 'app-workers-tasks',
  templateUrl: './workers-tasks.component.html',
  styleUrls: ['./workers-tasks.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class WorkersTasksComponent implements OnInit {
  repairId: string;
  repairActivities: Activity[];
  assignments: Assignment[] = [];

  columnsToDisplay = ['description', 'status', 'worker'];

  constructor(private activityService: ActivityService, private activityCreatorDialog: MatDialog,
    private route: ActivatedRoute, private spinnerService: SpinnerService) { }


  ngOnInit() {
    this.spinnerService.show();
    this.route.params.subscribe(params => (this.repairId = params['id'], console.log(this.repairId)));
    this.activityService.getRepairActivities(this.repairId).subscribe(activities => (
      this.repairActivities = activities, console.log(activities),
      activities.map(activity => this.assignments[activity.id] = { Id: null, Name: null }),
      this.spinnerService.hide()));
  }

  openActivityCreatorDialog(): void {
    const dialogRef = this.activityCreatorDialog.open(ActivityCreatorComponent, {
      data: { repairId: this.repairId }
    });
    dialogRef.afterClosed().subscribe(x => (
      this.spinnerService.show(),
      this.activityService.getRepairActivities(this.repairId).subscribe(activities => (
        this.repairActivities = activities,
        activities.map(activity => this.assignments[activity.id] = { Id: null, Name: null }),
        this.spinnerService.hide())
      )));
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer !== event.container) {
      let workerId = event.previousContainer.data[event.previousIndex]['id'];
      let activityId = event.container.id;
      this.assignments[activityId].Id = workerId;
      let workerName = event.previousContainer.data[event.previousIndex]['firstName'] +
        event.previousContainer.data[event.previousIndex]['lastName'];
      this.assignments[activityId].Name = workerName;
      this.activityService.assignWorker(workerId, activityId).subscribe();
    }
  }
}

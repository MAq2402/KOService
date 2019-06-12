import { Component, OnInit, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Activity } from 'src/app/shared/models/Activity';
import { ActivityService } from 'src/app/shared/services/activity.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
import { ActivityCreatorComponent } from '../activity-creator/activity-creator.component'
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
import { Employee } from 'src/app/shared/models/employee.model';
import { WorkerActivities } from '../workers-table/workers-table.component';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { ConfirmationModel } from 'src/app/shared/models/confirmation.model';
import { RepairService } from 'src/app/shared/services/repair.service';
import { CancelModel } from '../../models/cancel.model';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { FinishModel } from '../../models/finish.model';
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

  columnsToDisplay = ['description', 'type', 'status', 'worker'];

  constructor(private activityService: ActivityService,
    private dialog: MatDialog,
    private route: ActivatedRoute) { }


  ngOnInit() {
    this.route.params.subscribe(params => (this.repairId = params['id'], console.log(this.repairId)));
    this.activityService.getRepairActivities(this.repairId).subscribe(activities => (
      this.repairActivities = activities, activities.map(activity => this.assignments[activity.id] = { Id: null, Name: null })));
  }

  openActivityCreatorDialog(): void {
    const dialogRef = this.dialog.open(ActivityCreatorComponent, {
      data: { repairId: this.repairId }
    });
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

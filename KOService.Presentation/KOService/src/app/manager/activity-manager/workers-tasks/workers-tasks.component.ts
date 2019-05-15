import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Activity } from 'src/app/shared/models/Activity';
import { ActivityService } from 'src/app/shared/services/activity.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivityCreatorComponent } from '../activity-creator/activity-creator.component'
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
import { Employee } from 'src/app/shared/models/employee.model';
import { WorkerActivities } from '../workers-table/workers-table.component';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { Role } from 'src/app/shared/enums/Role';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { Repair } from 'src/app/shared/models/repair.model';
import { RepairService } from 'src/app/shared/services/repair.service';
import { RepairStatus } from 'src/app/shared/enums/repair-status';
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

  //TODO: request id as input
  requestId = '0';
  //TODO: GET DATA BASED ON THIS
  repairId: string;
  repair: Repair;

  repairActivities: Activity[];
  workers: Employee[];
  assigned: WorkerActivities[] = [];

  columnsToDisplay = ['description', 'type', 'status', 'worker'];
  name; animal;
  constructor(private activityService: ActivityService,
    private activityCreatorDialog: MatDialog,
    private employeeService: EmployeeService,
    private activatedRoute: ActivatedRoute,
    private repairService: RepairService,
    public dialog: MatDialog
  ) { }


  ngOnInit() {
    this.repairId = this.activatedRoute.snapshot.paramMap.get('id');

    this.repairService.getRepair(this.repairId).subscribe(repair => this.repair = repair);

    this.activityService.getActivities(this.requestId).subscribe(activities => this.repairActivities = activities);
    this.employeeService.getEmployees(Role.mechanic).subscribe(data => this.workers = data);
  }

  openActivityCreatorDialog(): void {
    const dialogRef = this.activityCreatorDialog.open(ActivityCreatorComponent, {

      data: { name: this.name, animal: this.animal }
    });
  }

  changeToInProgress() {
      const dialogRef = this.dialog.open(ConfirmationComponent, {
        data: {header: `Jesteś pewny, że chcesz zmienić status naprawy na "w trakcie"?`}
      });

      dialogRef.afterClosed().subscribe(result => {

      });
  }

  cancel() {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {header: `Jesteś pewny, że chcesz odwołać naprawę?`}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  finish() {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {header: `Jesteś pewny, że chcesz zakończyć naprawę?`}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  cancelDisabled(): boolean {
    return this.repair.status === RepairStatus.Canceled;
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

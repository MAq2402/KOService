import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { RepairStatus } from 'src/app/shared/enums/repair-status.enum';
import { ColumnDef } from 'src/app/shared/models/column-def.model';
import { RepairSubTask } from 'src/app/shared/models/repair-sub-task.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DetailExpandAnimation } from '../animations/detail-expand-animation';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { Activity } from 'src/app/shared/models/Activity';
import { RepairService } from 'src/app/shared/services/repair.service';
import { Repair } from 'src/app/shared/models/repair.model';
import { MatPaginator } from '@angular/material';
import { SpinnerService } from 'src/app/core/services/spinner.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    DetailExpandAnimation
  ],
})
export class HomeComponent implements OnInit {

  repairsDataSource: MatTableDataSource<Repair>;
  activitiesDataSource: Activity[] = [];
  showWithStatusOpen = true;
  showWithStatusInProgress = true;
  showWithStatusFinished = false;
  showWithStatusCanceled = false;
  filterValue = '';

  repairsColumnsToDisplay: string[] = [
    'vehicleRegistrationNumbers',
    'vehicleBrand',
    'vehicleModel',
    'description',
    'status',
    'startDateTime',
    'details'
  ];

  activitiesColumnsToDisplay: string[] = [
    'description',
    'mechanicName',
    'status',
    'startDateTime'
  ];

  expandedElement: any | null;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private authService: AuthService,
    private repairService: RepairService,
    private spinnerService: SpinnerService
  ) { }


  ngOnInit() {
    this.getData();
  }

  applyFilter(filterValue: string) {
    this.filterValue = filterValue;
    this.repairsDataSource.filter = filterValue.trim().toLowerCase();

    if (this.repairsDataSource.paginator) {
      this.repairsDataSource.paginator.firstPage();
    }
  }

  onStatusCheckboxChange(event: any) {
    this.getData();
  }

  private getData() {
    if (this.showWithStatusCanceled || this.showWithStatusFinished || this.showWithStatusInProgress || this.showWithStatusOpen) {
      const statusQuery = this.buildStatusQuery();
      this.authService.getCurrentEmployee().subscribe(user => {
        this.repairService.getRepairs(statusQuery).subscribe(repairs => {

          for (const repair of repairs) {
            repair.activitiesDataSource = new MatTableDataSource(repair.activities);
          }

          this.repairsDataSource = new MatTableDataSource(repairs);
          this.repairsDataSource.sort = this.sort;
          this.repairsDataSource.paginator = this.paginator;
          this.repairsDataSource.filter = this.filterValue.trim().toLowerCase();
          this.spinnerService.hide();
        });
      });
    } else {
      this.repairsDataSource = null;
      this.spinnerService.hide();
    }
  }

  private buildStatusQuery() {
    let statusQuery = '';
    if (this.showWithStatusOpen) {
      statusQuery += 'OPN,';
    }
    if (this.showWithStatusInProgress) {
      statusQuery += 'PRO,';
    }
    if (this.showWithStatusCanceled) {
      statusQuery += 'CAN,';
    }
    if (this.showWithStatusFinished) {
      statusQuery += 'FIN';
    }
    return statusQuery;
  }
}

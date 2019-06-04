import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivityService } from 'src/app/shared/services/activity.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Activity } from 'src/app/shared/models/Activity';
import { ActivityStatus } from 'src/app/shared/enums/ActivityStatus';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ActivitiesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<Activity>;
  showWithStatusOpen = true;
  showWithStatusInProgress = true;
  showWithStatusFinished = false;
  showWithStatusCanceled = false;
  filterValue = '';

  displayedColumns = ['startDateTime', 'description','vehicleRegistrationNumbers', 'vehicleBrand', 'status'];
  columnsToDisplayMap = [
    {name: 'description', display: 'opis'},
    {name: 'vehicleRegistrationNumbers', display: 'numer rejestracyjny'},
    {name: 'vehicleBrand', display: 'marka pojazdu'
  }];

  constructor(
    private activityService: ActivityService,
    private authService: AuthService,
    private spinnerService: SpinnerService
  ){ }

  getData(){
    var statusQuery = this.buildStatusQuery();
    if (this.showWithStatusCanceled || this.showWithStatusFinished || this.showWithStatusInProgress || this.showWithStatusOpen) {
      this.authService.getCurrentEmployee().subscribe(user => {
        this.activityService.getMechanicActivity(user.id, statusQuery).subscribe(
          activities => {
            this.dataSource = new MatTableDataSource(activities);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.spinnerService.hide(); // show in auth.service -> login
        });

      })
    }
    else{
      this.dataSource = null;
      this.spinnerService.hide(); // show in auth.service -> login
    }
  }

  ngOnInit() {
    this.getData();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  checkIfNotHistorical(status: ActivityStatus): boolean{
    if(status <= ActivityStatus.Progress)
        return true;
    else
      return false;
  }

  checkIfOpen(status: ActivityStatus): boolean{
    if(status == ActivityStatus.Open)
      return true;
    else
      return false;
  }

  onStatusCheckboxChange(event: any) {
    this.getData();
  }

  private buildStatusQuery() {
    let statusQuery = '';
    if (this.showWithStatusOpen) {
      statusQuery += '0,';
    }
    if (this.showWithStatusInProgress) {
      statusQuery += '1,';
    }
    if (this.showWithStatusCanceled) {
      statusQuery += '2,';
    }
    if (this.showWithStatusFinished) {
      statusQuery += '3';
    }
    return statusQuery;
  }
}


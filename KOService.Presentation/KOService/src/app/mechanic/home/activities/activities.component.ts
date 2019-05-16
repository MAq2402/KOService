import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivityService } from 'src/app/shared/services/activity.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Activity } from 'src/app/shared/models/Activity';
import { ActivityStatus } from 'src/app/shared/enums/ActivityStatus';
import { RepairService } from 'src/app/shared/services/repair.service';
import { Repair } from 'src/app/shared/models/repair.model';
import { AuthService } from 'src/app/authentication/services/auth.service';

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
  dataSource = new MatTableDataSource<Activity>();
  showWithStatusOpen = true;
  showWithStatusInProgress = true;
  showWithStatusFinished = false;
  showWithStatusCanceled = false;

  displayedColumns = ['startDateTime', 'description','vehicleRegistrationNumbers',
    'vehicleBrand', 'status'];
  columnsToDisplayMap = [  
    {name: 'description', display: 'opis'}, 
    {name: 'vehicleRegistrationNumbers', display: 'numer rejestracyjny'},
    {name: 'vehicleBrand', display: 'marka pojazdu'  
  }];

  constructor(
    private activityService: ActivityService, 
    private authService: AuthService
  ){ }

  ngOnInit() {
    this.authService.getCurrentEmployee().subscribe(user => {
      this.activityService.getMechanicActivity(user.id).subscribe(
        activities => {
        this.dataSource.data = activities as Activity[];
      });

    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
    console.log("chexbox changed");
  }
  
}


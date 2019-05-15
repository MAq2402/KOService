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
  repairs: Repair[] = [];
  userId: string;
  displayedColumns = ['requestTime', 'description', 'sequenceNumber','vehicleRegistrationNumbers',
    'status','vehicleBrand'];
  columnsToDisplayMap = [  {name: 'requestTime', display: 'data'},
    {name: 'description', display: 'opis'}, 
    {name: 'sequenceNumber', display: 'poziom ważności'},
    {name: 'vehicleRegistrationNumbers', display: 'numery rejestracyjne'},
    {name: 'vehicleBrand', display: 'marka'  
  }];

  constructor(
    private activityService: ActivityService, 
    private  repairService: RepairService,
    private authService: AuthService
  ){ }

  ngOnInit() {
    this.activityService.getMechanicActivity("2c26cb8d-e332-4211-97fa-743cf63a59c5").subscribe(
      activities => {
      this.dataSource.data = activities as Activity[];
    });

    this.authService.getCurrentEmployee().subscribe(x => {
     //this.repairService.getRepairs(x.id).subscribe(r => this.repairs = r);
    });
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
  
}


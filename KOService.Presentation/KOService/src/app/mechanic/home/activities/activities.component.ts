import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivityService } from 'src/app/shared/services/activity.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Activity } from 'src/app/shared/models/Activity';
import { ActivityStatus } from 'src/app/shared/enums/ActivityStatus';
import { RepairService } from 'src/app/shared/services/repair.service';
import { Repair } from 'src/app/shared/models/repair.model';

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
  repairs: Repair[];
  userId: string;
  displayedColumns = ['requestTime', 'description', 'status', 'sequenceNumber','carNumbers', 'carBrand'];
  columnsToDisplayMap = [  {name: 'requestTime', display: 'data'},
    {name: 'description', display: 'opis'}, 
    {name: 'status', display: 'status'},
    {name: 'sequenceNumber', display: 'poziom ważności'
  }];

  constructor(
    private activityService: ActivityService, 
    private  repairService: RepairService
  ){ }

  ngOnInit() {
    this.userId = localStorage.getItem('auth_key');
    this.activityService.getWorkerActivities("1").subscribe(
      activities => { 
      this.dataSource.data = activities as Activity[];
    });     
    this.repairService.getRepairs().subscribe(r => this.repairs = r);
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
  
  getCarNumbers(repairId: string): string{
    return this.repairs.find(r => r.id === repairId).vehicleRegistrationNumbers;
  }

  getCarBrand(repairId: string): string{
    return this.repairs.find(r => r.id === repairId).vehicleBrand;
  }
}


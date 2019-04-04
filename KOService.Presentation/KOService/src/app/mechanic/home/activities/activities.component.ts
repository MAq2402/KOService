import { Component, OnInit } from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {Activity} from 'src/app/shared/models/Activity';
import {ActivityService} from 'src/app/shared/services/activity.service';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {

  displayedColumns: string[] = ['numer', 'opis'];
  activities: Activity[];
  dataSource: MatTableDataSource<Activity>;
  employeeId: string;
  
  constructor(
    private activityService: ActivityService,
  ) { }

  ngOnInit() {
    this.employeeId = localStorage.getItem('auth_key');
    this.activityService.getWorkerActivities(this.employeeId)
      .subscribe(a => (this.activities = a));
      this.dataSource = new MatTableDataSource<Activity>(this.activities);
  }



}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ActivitiesDataSource } from './activities-datasource';
import { ActivityService } from 'src/app/shared/services/activity.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

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
  dataSource: ActivitiesDataSource;

  displayedColumns = ['id', 'requestId', 'description'];

  constructor(private activityService: ActivityService){ }

  ngOnInit() {
   
    this.dataSource = new ActivitiesDataSource(this.paginator, this.sort, this.activityService);
  }
}

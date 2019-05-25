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
  repairsColumnsToDisplay: ColumnDef[] = [
    { name: 'vehicleRegistrationNumbers', display: 'Numery rejestracyjne' },
    { name: 'vehicleBrand', display: 'Marka' },
    { name: 'vehicleModel', display: 'Model' },
    { name: 'description', display: 'Opis' },
    { name: 'status', display: 'Status'},
    { name: 'startDateTime', display: 'Data rozpoczęcia'}
  ];

  activitiesColumnsToDisplay: ColumnDef[] = [
    { name: 'description', display: 'Opis' },
    { name: 'mechanicName', display: 'Mechanik' },
    { name: 'statusDisplay', display: 'Status'},
    { name: 'startDateTime', display: 'Data rozpoczęcia'}
  ];

  expandedElement: any | null;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private authService: AuthService, private repairService: RepairService) { }


  ngOnInit() {
    this.getData();
  }

  getRepairsColumnsToDisplayNames(): string[] {
    return this.repairsColumnsToDisplay.map(x => x.name);
  }

  getActivitiesColumnsToDisplayNames(): string[] {
    return this.activitiesColumnsToDisplay.map(x => x.name);
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
        this.repairService.getRepairs( statusQuery).subscribe(repairs => {
          this.repairsDataSource = new MatTableDataSource(repairs);
          this.repairsDataSource.sort = this.sort;
          this.repairsDataSource.paginator = this.paginator;
          this.repairsDataSource.filter = this.filterValue.trim().toLowerCase();
        });
      });
    } else {
      this.repairsDataSource = null;
    }
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

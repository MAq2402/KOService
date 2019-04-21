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
  subTasksDataSource: Activity[] = [];
  repairsColumnsToDisplay: ColumnDef[] = [
    { name: 'vehicleRegistrationNumbers', display: 'Numery rejestracyjne' },
    { name: 'vehicleBrand', display: 'Marka' },
    { name: 'vehicleModel', display: 'Model' },
    { name: 'description', display: 'Opis' },
    { name: 'status', display: 'Status'},
    { name: 'startDateTime', display: 'Data rozpoczęcia'}
  ];

  subTasksColumnsToDisplay: ColumnDef[] = [
    { name: 'description', display: 'Opis' },
    { name: 'mechanicName', display: 'Mechanik' },
    { name: 'statusDisplay', display: 'Status'},
    { name: 'startDateTime', display: 'Data rozpoczęcia'}
  ];

  expandedElement: any | null;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private authService: AuthService, private repairService: RepairService) { }


  ngOnInit() {
    this.repairService.getRepairs().subscribe(repairs => {
      this.repairsDataSource = new MatTableDataSource(repairs);
      this.repairsDataSource.sort = this.sort;
      for (const repair of repairs) {
        this.subTasksDataSource.push.apply(repair.activities);
      }
    });
  }

  getRepairsColumnsToDisplayNames(): string[] {
    return this.repairsColumnsToDisplay.map(x => x.name);
  }

  getSubTasksColumnsToDisplayNames(): string[] {
    return this.subTasksColumnsToDisplay.map(x => x.name);
  }

  applyFilter(filterValue: string) {
    this.repairsDataSource.filter = filterValue.trim().toLowerCase();
  }
}

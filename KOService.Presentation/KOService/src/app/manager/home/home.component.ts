import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Repair } from 'src/app/shared/models/repair.model';
import { RepairStatus } from 'src/app/shared/enums/repair-status.enum';
import { ColumnDef } from 'src/app/shared/models/column-def.model';
import { RepairSubTask } from 'src/app/shared/models/repair-sub-task.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DetailExpandAnimation } from '../animations/detail-expand-animation';

const REPIAR_SUB_TASKS: RepairSubTask[] = [
  {
    id: '1',
    sequenceNumber: 1,
    description: 'Wymiana klocków hamulcowych',
    result: '',
    status: RepairStatus.Open,
    statusDisplay: 'Otwarty',
    startDateTime: '06-04-2018',
    endDateTime: '06-04-2018',
    mechanicId: '1',
    mechanicName: 'Janusz Kowalski'
  }, {
    id: '2',
    sequenceNumber: 2,
    description: 'Wymiana oleju',
    result: '',
    status: RepairStatus.Open,
    statusDisplay: 'Otwarty',
    startDateTime: '06-04-2018',
    endDateTime: '06-04-2018',
    mechanicId: '2',
    mechanicName: 'Mirosław Nowak'
  }, {
    id: '3',
    sequenceNumber: 2,
    description: 'Wymiana szprzęgła',
    result: '',
    status: RepairStatus.Open,
    statusDisplay: 'Otwarty',
    startDateTime: '06-04-2018',
    endDateTime: '06-04-2018',
    mechanicId: '2',
    mechanicName: 'Zdzisław Kopara'
  }
];

const REPAIRS: Repair[] = [
  {
    id: '1',
    description: 'Opis',
    result: '',
    status: RepairStatus.Open,
    statusDisplay: 'Otwarty',
    startDateTime: '06-04-2018',
    endDateTime: null,
    carId: '1',
    carBrand: 'BMW',
    carNumbers: 'asd123'
  }, {
    id: '2',
    description: 'Opis',
    result: '',
    status: RepairStatus.Open,
    statusDisplay: 'Otwarty',
    startDateTime: '06-04-2018',
    endDateTime: null,
    carId: '1',
    carBrand: 'BMW',
    carNumbers: 'asd123'
  }, {
    id: '3',
    description: 'Opis',
    result: '',
    status: RepairStatus.Canceled,
    statusDisplay: 'Odwołany',
    startDateTime: '06-04-2018',
    endDateTime: null,
    carId: '1',
    carBrand: 'BMW',
    carNumbers: 'asd123'
  }, {
    id: '4',
    description: 'Opis',
    result: '',
    status: RepairStatus.Canceled,
    statusDisplay: 'Odwołany',
    startDateTime: '06-04-2018',
    endDateTime: null,
    carId: '1',
    carBrand: 'BMW',
    carNumbers: 'asd123'
  }, {
    id: '5',
    description: 'Opis',
    result: '',
    status: RepairStatus.InProgress,
    statusDisplay: 'W trakcie',
    startDateTime: '06-04-2018',
    endDateTime: null,
    carId: '1',
    carBrand: 'Merc',
    carNumbers: 'asd123'
  }, {
    id: '6',
    description: 'Opis',
    result: '',
    status: RepairStatus.InProgress,
    statusDisplay: 'W trakcie',
    startDateTime: '06-04-2018',
    endDateTime: null,
    carId: '1',
    carBrand: 'Merc',
    carNumbers: 'asd123'
  }, {
    id: '7',
    description: 'Opis',
    result: '',
    status: RepairStatus.InProgress,
    statusDisplay: 'W trakcie',
    startDateTime: '06-04-2018',
    endDateTime: null,
    carId: '1',
    carBrand: 'BMW',
    carNumbers: 'asd123'
  }, {
    id: '8',
    description: 'Opis',
    result: '',
    status: RepairStatus.Finished,
    statusDisplay: 'Zakończony',
    startDateTime: '06-04-2018',
    endDateTime: null,
    carId: '1',
    carBrand: 'BMW',
    carNumbers: 'asd123'
  }, {
    id: '9',
    description: 'Opis',
    result: '',
    status: RepairStatus.Finished,
    statusDisplay: 'Zakończony',
    startDateTime: '06-04-2018',
    endDateTime: null,
    carId: '1',
    carBrand: 'BMW',
    carNumbers: 'asd123'
  }, {
    id: '10',
    description: 'Opis',
    result: '',
    status: RepairStatus.Finished,
    statusDisplay: 'Zakończony',
    startDateTime: '06-04-2018',
    endDateTime: null,
    carId: '1',
    carBrand: 'BMW',
    carNumbers: 'asd123'
  },
];
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    DetailExpandAnimation
  ],
})
export class HomeComponent implements OnInit {

  repairsDataSource = new MatTableDataSource(REPAIRS);
  subTasksDataSource = REPIAR_SUB_TASKS;
  repairsColumnsToDisplay: ColumnDef[] = [
    { name: 'id', display: 'Id' },
    { name: 'carBrand', display: 'Marka' },
    { name: 'carNumbers', display: 'Numery rejestracyjne' },
    { name: 'description', display: 'Opis' },
    { name: 'statusDisplay', display: 'Status'},
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

  constructor() { }

  ngOnInit() {
    this.repairsDataSource.sort = this.sort;
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

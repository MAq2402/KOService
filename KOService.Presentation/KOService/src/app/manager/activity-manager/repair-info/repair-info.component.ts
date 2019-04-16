import { Component, OnInit } from '@angular/core';
import { Repair } from 'src/app/shared/models/Repair';
import { RepairStatus } from 'src/app/shared/enums/repair-status';
import { Employee } from 'src/app/shared/models/employee.model';
import { Client } from 'src/app/shared/models/Client';
import { DomElementSchemaRegistry } from '@angular/compiler';

const REPAIR: Repair = 
  {
    id: '1',
    description: 'Rutynowy przegląd, wymiana płynów i filtrów',
    result: '',
    status: RepairStatus.Open,
    statusDisplay: 'Otwarty',
    startDateTime: '06-04-2018',
    endDateTime: null,
    carId: '1',
    carBrand: 'BMW',
    carNumbers: 'asd123'
  }
  
  const CLIENT: Client = 
  {
    id: '1',
    firstName: "Janusz",
    lastName: "Kowalski",
    phoneNumber: "123456789",
    email: "jkowalski@domena.com"

  }
  





@Component({
  selector: 'app-repair-info',
  templateUrl: './repair-info.component.html',
  styleUrls: ['./repair-info.component.css']
})
export class RepairInfoComponent implements OnInit {
  client: Client = CLIENT;
  repair: Repair = REPAIR;

  constructor() { }

  ngOnInit() {
  }

}

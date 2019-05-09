import { Component, OnInit } from '@angular/core';
import { RepairStatus } from 'src/app/shared/enums/repair-status';
import { Employee } from 'src/app/shared/models/employee.model';
import { Client } from 'src/app/shared/models/Client';
import { DomElementSchemaRegistry } from '@angular/compiler';
import { Repair } from 'src/app/shared/models/repair.model';
import { RepairService } from 'src/app/shared/services/repair.service';
  
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
  repair: Repair = null;

  constructor(private repairService: RepairService) { }

  ngOnInit() {
    this.repairService.getRepairs().subscribe(rep=>{this.repair = rep[0]; console.log(rep)})

  }

}

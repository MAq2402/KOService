import { Component, OnInit } from '@angular/core';
import { RepairStatus } from 'src/app/shared/enums/repair-status';
import { Employee } from 'src/app/shared/models/employee.model';
import { Client } from 'src/app/shared/models/Client';
import { DomElementSchemaRegistry } from '@angular/compiler';
import { Repair } from 'src/app/shared/models/repair.model';
import { RepairService } from 'src/app/shared/services/repair.service';
import { RepairInfo } from 'src/app/shared/models/repair-info.model';
import { ActivatedRoute } from '@angular/router';
  

  

@Component({
  selector: 'app-repair-info',
  templateUrl: './repair-info.component.html',
  styleUrls: ['./repair-info.component.css']
})
export class RepairInfoComponent implements OnInit {
  repairId: string;
  repairInfo: RepairInfo;

  constructor(private repairService: RepairService,private route: ActivatedRoute) { 
    this.repairId = "499b6e90-56fa-4074-abfa-2c4438c97f2b";
  }

  ngOnInit() {
    this.route.params.subscribe(params=>(this.repairId = params['id']));
    this.repairService.getRepairInfo(this.repairId).subscribe(rep=>this.repairInfo = rep)
  }

}

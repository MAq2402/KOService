import { Component, OnInit } from '@angular/core';
import { Valuation } from 'src/app/shared/models/valuation.model';
import { RepairService } from 'src/app/shared/services/repair.service';
import { ValuationService } from 'src/app/shared/services/valuation.service';
import { ActivityService } from 'src/app/shared/services/activity.service';
import { RepairInfo } from 'src/app/shared/models/repair-info.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  repair: RepairInfo;
  valuation: Valuation;
  accepted: false;
  declined: false;

  constructor(private repairService: RepairService, private valuationService: ValuationService, activityService: ActivityService) { }

  ngOnInit() {
    this.valuation = this.valuationService.getValuation('1');
    this.repair = this.repairService._getRepairInfo();
  }

}

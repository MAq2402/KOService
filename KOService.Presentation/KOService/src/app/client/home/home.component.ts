import { Component, OnInit } from '@angular/core';
import { Valuation } from 'src/app/shared/models/valuation.model';
import { RepairService } from 'src/app/shared/services/repair.service';
import { ValuationService } from 'src/app/shared/services/valuation.service';
import { ActivityService } from 'src/app/shared/services/activity.service';
import { RepairInfo } from 'src/app/shared/models/repair-info.model';
import { Activity } from 'src/app/shared/models/Activity';
import { ActivityStatus } from 'src/app/shared/enums/ActivityStatus';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  repair: RepairInfo;
  valuation: Valuation;
  activities: Activity[];
  accepted: boolean;
  declined: boolean;
  total: Number;

  constructor(private repairService: RepairService, private valuationService: ValuationService,
    private activityService: ActivityService) { }

  ngOnInit() {
    this.valuation = this.valuationService.getValuation('1');
    this.repair = this.repairService._getRepairInfo();
    this.activities = this.activityService._getRepairActivities();
    this.total = this.sum();
    this.accepted = false;
    this.declined = false;
  }

  sum(): number {
    let total = 0;
    for (let i = 0; i < this.valuation.parts.length; i++) {
           total = total + Number(this.valuation.parts[i].cost);
         }
    total = total + Number(this.valuation.laborCosts);
    return total;
  }

  transformStatus(status: ActivityStatus): string {
    switch (status) {
      case ActivityStatus.Canceled: return 'Anulowano';
      case ActivityStatus.Finished: return 'Skończono';
      case ActivityStatus.Open: return 'Otwarto';
      case ActivityStatus.Progress: return 'W trakcie';
      default: return '';
    }
  }

  acceptValuation() {
    this.accepted = true;
    this.valuationService.acceptValuation();
  }

  declineValuation() {
    this.declined = true;
    this.valuationService.declineValuation();
  }

}

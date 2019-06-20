import { Component, OnInit } from '@angular/core';
import { Pricing } from 'src/app/shared/models/pricing.model';
import { RepairService } from 'src/app/shared/services/repair.service';
import { ActivityService } from 'src/app/shared/services/activity.service';
import { RepairInfo } from 'src/app/shared/models/repair-info.model';
import { Activity } from 'src/app/shared/models/Activity';
import { ActivityStatus } from 'src/app/shared/enums/ActivityStatus';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { RepairStatus } from 'src/app/shared/enums/repair-status.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  repair: RepairInfo;
  pricing: Pricing;
  activities: Activity[];
  accepted: boolean;
  declined: boolean;
  repairId = 'df309ed1-5720-4422-9e78-f5da56bc96a6';
  repairNumber = 'EDWVJNQK';

  constructor(private repairService: RepairService,
              private activityService: ActivityService,
              private spinnerService: SpinnerService) { }

  ngOnInit() {
    this.getData();
    this.accepted = false;
    this.declined = false;
  }
  getData(){
    this.spinnerService.show();
    this.repairService.getRepairPricing(this.repairNumber).subscribe(pricing=>{this.pricing = pricing,console.log(pricing)});
    this.repairService.getRepairInfo(this.repairId).subscribe(info=>{this.repair=info,console.log(info)});
    this.activityService.getRepairActivities(this.repairId).subscribe(activities=>this.activities=activities);
    this.spinnerService.hide();
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

  acceptPricing() {
    this.accepted = true;
   
  }

  rejectPricing() {
    this.declined = true;
    
  }
  pricingExists(): boolean{
    if(this.repair.status==RepairStatus.Open) return false;
    else return true; 
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivityStatus } from 'src/app/shared/enums/ActivityStatus';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { ClientService } from 'src/app/shared/services/client.service';
import { RepairForClient } from 'src/app/shared/models/repair-for-client.model';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Repair } from 'src/app/shared/models/repair.model';
import { RepairStatus } from 'src/app/shared/enums/repair-status.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  repair: RepairForClient;
  accepted: boolean;
  declined: boolean;
  repairNumber = '';

  constructor(private clientService: ClientService,
    private spinnerService: SpinnerService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => (this.repairNumber = params['number'], console.log(this.repairNumber)));
    this.getData();
  }

  getData() {
    this.spinnerService.show();
    this.clientService.getRepairForClient(this.repairNumber).subscribe(repair => {
      this.repair = repair;      console.log(this.repair);} , err => {
      this.snackBar.open('Nie udało sie załadować naprawy');
    });
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
    this.clientService.acceptPricing(this.repairNumber).subscribe(x => this.getData(), err => {
      this.snackBar.open("wycena nie została zaakceptowana");
    });
  }

  rejectPricing() {
    this.clientService.rejectPricing(this.repairNumber).subscribe(x => this.getData(), err => {
      this.snackBar.open("wycena nie została odrzucona");
      this.getData();
    });
  }

  showPricingDecisionOptions(): boolean {
    return this.repair.status === RepairStatus.Priced;
  }
}

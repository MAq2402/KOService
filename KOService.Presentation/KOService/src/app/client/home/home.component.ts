import { Component, OnInit } from '@angular/core';
import { ActivityStatus } from 'src/app/shared/enums/ActivityStatus';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { ClientService } from 'src/app/shared/services/client.service';
import { RepairForClient } from 'src/app/shared/models/repair-for-client.model';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

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
    this.getData();
    this.accepted = false;
    this.declined = false;
  }
  getData(){
    //this.spinnerService.show();
    this.route.params.subscribe(params => (this.repairNumber = params['number'], console.log(this.repairNumber)));
    this.clientService.getRepairForClient(this.repairNumber).subscribe(repair=>this.repair=repair, err=>{
      this.snackBar.open("Numer naprawy jest niepoprawny");
      this.router.navigate(['']);

    });
    //this.spinnerService.hide();
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
    this.clientService.acceptPricing(this.repairNumber).subscribe(x=>x, err=>{
      this.snackBar.open("wycena nie została zaakceptowana");
    })
    this.accepted = true;

  }

  rejectPricing() {
    this.clientService.rejectPricing(this.repairNumber).subscribe(x=>x, err=>{
      this.snackBar.open("wycena nie została odrzucona");
    })
    this.declined = true;

  }

}

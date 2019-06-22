import { Component, OnInit } from '@angular/core';
import { RepairStatus } from 'src/app/shared/enums/repair-status';
import { Employee } from 'src/app/shared/models/employee.model';
import { Client } from 'src/app/shared/models/Client';
import { DomElementSchemaRegistry } from '@angular/compiler';
import { Repair } from 'src/app/shared/models/repair.model';
import { RepairService } from 'src/app/shared/services/repair.service';
import { RepairInfo } from 'src/app/shared/models/repair-info.model';
import { ActivatedRoute } from '@angular/router';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { ConfirmationModel } from 'src/app/shared/models/confirmation.model';
import { CancelModel } from '../../models/cancel.model';
import { FinishModel } from '../../models/finish.model';
import { MatDialog, MatSnackBar } from '@angular/material';

import { PricingCreatorComponent } from '../pricing-creator/pricing-creator.component';

@Component({
  selector: 'app-repair-info',
  templateUrl: './repair-info.component.html',
  styleUrls: ['./repair-info.component.css']
})
export class RepairInfoComponent implements OnInit {
  repairId: string;
  repairInfo: RepairInfo;


  constructor(private repairService: RepairService,
    private route: ActivatedRoute,
    private spinnerService: SpinnerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private pricingCreatorDialog: MatDialog) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => (this.repairId = params['id']));
    this.getData();
  }

  private getData() {
    //this.spinnerService.show();
    this.repairService.getRepairInfo(this.repairId).subscribe(rep => {
      this.repairInfo = rep; //this.spinnerService.hide();
    });
  }

  priceRepair() {
    const confirmationModel: ConfirmationModel = {
      header: 'Jesteś pewny, że chcesz rozpocząć naprawę?',
      confirmed: null,
      withInput: false,
      placeholder: '',
      isInputRequired: null,
      confirmationMessage: ''
    };

      const dialogRef = this.pricingCreatorDialog.open(PricingCreatorComponent, {
       data: {repairId: this.repairId}
    });

    dialogRef.afterClosed().subscribe(x=>this.getData())
  }



  cancelRepair() {
    const confirmationModel: ConfirmationModel = {
      header: 'Jesteś pewny, że chcesz odwołać naprawę?',
      confirmed: null,
      withInput: true,
      placeholder: 'Powód',
      isInputRequired: true,
      confirmationMessage: ''
    };
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: confirmationModel
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const model: CancelModel = {
          result: result.confirmationMessage
        };

        this.repairService.cancel(this.repairId, model).subscribe(res => {
          this.getData();
        },
          err => this.openSnackBar('Anulowanie nie powiodło się'),
          () => this.openSnackBar('Anulowanie powiodło się'));
      }
    });
  }

  finishRepair() {
    const confirmationModel: ConfirmationModel = {
      header: 'Jesteś pewny, że chcesz zakonczyć naprawę?',
      confirmed: null,
      withInput: true,
      placeholder: 'Powód',
      isInputRequired: false,
      confirmationMessage: ''
    };
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: confirmationModel
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const model: FinishModel = {
          result: result.confirmationMessage
        };

        this.repairService.finish(this.repairId, model).subscribe(res => {
          this.getData();
        },
          err => this.openSnackBar('Zakończenie nie powiodło się'),
          () => this.openSnackBar('Zakończenie powiodło się'));
      }
    });
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message);
  }

  disableCancel(): boolean {
    return this.repairInfo.status === RepairStatus.Canceled;
  }

  disableFinish(): boolean {
    return this.repairInfo.status !== RepairStatus.InProgress;
  }

  disablePrice(): boolean {
    if(this.repairInfo.status === RepairStatus.Open) return false;
    else return true;

  }

  showEndDateTime(): boolean {
    return this.repairInfo.endDateTime &&
            (this.repairInfo.status === RepairStatus.Finished || this.repairInfo.status === RepairStatus.Canceled);
  }
}

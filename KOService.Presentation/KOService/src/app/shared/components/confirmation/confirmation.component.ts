import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from 'src/app/manager/activity-manager/activity-creator/activity-creator.component';
import { ConfirmationModel } from '../../models/confirmation.model';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationModel) { }

  ngOnInit() {
  }

  onYes() {
    this.data.confirmed = true;
    this.dialogRef.close(this.data);
  }

  onNo() {
    this.data.confirmed = false;
    this.dialogRef.close(this.data);
  }
}

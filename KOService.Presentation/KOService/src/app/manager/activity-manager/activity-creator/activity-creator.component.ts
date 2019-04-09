import { Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  animal: string;
  name: string;
}

 

@Component({
  selector: 'app-activity-creator',
  templateUrl: './activity-creator.component.html',
  styleUrls: ['./activity-creator.component.css']
})
export class ActivityCreatorComponent implements OnInit {
  activityTypes: string[] = ["Mechaniczne","Elektroniczne","Blacharskie"];
 

  constructor(
    public dialogRef: MatDialogRef<ActivityCreatorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit() {
  }

}

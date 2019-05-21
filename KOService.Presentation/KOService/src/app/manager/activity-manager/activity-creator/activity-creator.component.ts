import { Component, OnInit, Inject,} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,} from '@angular/material';
import { ActivityCreation } from 'src/app/shared/models/activity-creation.model';
import { ActivityService } from 'src/app/shared/services/activity.service';

export interface DialogData {
  repairId: string;
}


 

@Component({
  selector: 'app-activity-creator',
  templateUrl: './activity-creator.component.html',
  styleUrls: ['./activity-creator.component.css']
})
export class ActivityCreatorComponent implements OnInit {
  
 activity : ActivityCreation;

  constructor(public dialogRef: MatDialogRef<ActivityCreatorComponent>,
     @Inject(MAT_DIALOG_DATA) public data: DialogData,public activityService : ActivityService){
       this.activity = new ActivityCreation();
     } 

  ngOnInit() {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(){
    this.activity.repairId = this.data.repairId
    this.activityService.addActivity(this.activity).subscribe(activity=>console.log(activity));


    
  }

}

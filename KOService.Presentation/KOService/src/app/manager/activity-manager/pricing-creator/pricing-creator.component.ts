import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { RepairService } from 'src/app/shared/services/repair.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../activity-creator/activity-creator.component';

@Component({
  selector: 'app-pricing-creator',
  templateUrl: './pricing-creator.component.html',
  styleUrls: ['./pricing-creator.component.css']
})
export class PricingCreatorComponent implements OnInit {
  pricingForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<PricingCreatorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder, private repairService:RepairService) { }

  ngOnInit() {
    this.pricingForm = this.formBuilder.group({
      repairId: [this.data.repairId],
      labour: [0, Validators.required],
      parts: this.formBuilder.array([
          this.initPart(),
      ])
    
  });

  }
  initPart(){
    return this.formBuilder.group({
      name: ['', Validators.required],
      manufacturer: ['', Validators.required],
      manufacturerId: ['', Validators.required],
      price: [0, Validators.required]
    })
  }

  addPart() {
    const control = <FormArray>this.pricingForm.controls['parts'];
    control.push(this.initPart());
}

removePart(i: number) {
    const control = <FormArray>this.pricingForm.controls['parts'];
    control.removeAt(i);
}


  onSubmit(){
    console.log(this.pricingForm.value)
    this.repairService.addRepairPricing(this.pricingForm.value,this.data.repairId).subscribe(pricing => console.log(pricing));
  }
  onCancel(): void {
    this.dialogRef.close();
  }

}
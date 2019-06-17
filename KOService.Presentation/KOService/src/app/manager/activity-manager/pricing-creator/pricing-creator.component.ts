import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { RepairService } from 'src/app/shared/services/repair.service';

@Component({
  selector: 'app-pricing-creator',
  templateUrl: './pricing-creator.component.html',
  styleUrls: ['./pricing-creator.component.css']
})
export class PricingCreatorComponent implements OnInit {
  repairId = "c4caf516-85c6-4611-ade1-c4413b959d7b";
  pricingForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private repairService:RepairService) { }

  ngOnInit() {
    this.pricingForm = this.formBuilder.group({
      repairId: [this.repairId],
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
    this.repairService.addRepairPricing(this.pricingForm.value,this.repairId).subscribe(pricing => console.log(pricing));
  }

}

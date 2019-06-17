import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-pricing-creator',
  templateUrl: './pricing-creator.component.html',
  styleUrls: ['./pricing-creator.component.css']
})
export class PricingCreatorComponent implements OnInit {

  pricingForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.pricingForm = this.formBuilder.group({
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
    console.log(this.pricingForm.value);
  }

}

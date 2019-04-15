import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-repair',
  templateUrl: './add-repair.component.html',
  styleUrls: ['./add-repair.component.css']
})
export class AddRepairComponent implements OnInit {

  clientFormGroup: FormGroup;
  carFormGroup: FormGroup;
  repairFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.clientFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['' , Validators.required]
    });
    this.carFormGroup = this._formBuilder.group({
      car: ['', Validators.required],
      carNumber: ['', Validators.required]
    });
    this.repairFormGroup = this._formBuilder.group({
      description: ['', Validators.required]
    });
  }

  public submit() {
    // console.log(this.clientFormGroup.controls['name'].value);
    console.log('Repair added');
  }
}

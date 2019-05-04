import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import { RepairService } from 'src/app/shared/services/repair.service';
import { ClientService } from 'src/app/shared/services/client.service';
import { VehicleService } from 'src/app/shared/services/vehicle.service';
import { Client } from 'src/app/shared/models/Client';
import { Vehicle } from 'src/app/shared/models/Vehicle';
import { of } from 'rxjs';

@Component({
  selector: 'app-add-repair',
  templateUrl: './add-repair.component.html',
  styleUrls: ['./add-repair.component.css']
})
export class AddRepairComponent implements OnInit {

  clientFormGroup: FormGroup;
  vehicleFormGroup: FormGroup;
  repairFormGroup: FormGroup;
  currentClientList: Client[];
  currentVehicleList: Vehicle[];
  clientList: Client[];
  vehicleList: Vehicle[];
  filterValue = '';
  hasOwner = false;

  constructor(private _formBuilder: FormBuilder, private snackBar: MatSnackBar, private repairService: RepairService,
    private clientService: ClientService, private vehicleService: VehicleService) {}

  ngOnInit() {
    this.clientFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['' , Validators.required],
      street: ['' , Validators.required],
      city: ['' , Validators.required],
      code: ['' , Validators.required]
    });
    this.vehicleFormGroup = this._formBuilder.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      registrationNumber: ['', Validators.required]
    });
    this.repairFormGroup = this._formBuilder.group({
      description: ['', Validators.required]
    });

    this.getVehicles();
    this.getClients();
  }

  public submit() {
    // zapis klienta
    // zapis pojazdu
    // zapis naprawy
    this.repairFormGroup.reset();
    this.vehicleFormGroup.reset();
    this.clientFormGroup.reset();
    this.snackBar.open('Pomyślnie dodano naprawę', undefined, {
      duration: 2000,
    });

    this.getVehicles();
    this.getClients();
  }

  public setClientForm(client: Client) {
    this.clientFormGroup.controls['firstName'].setValue(client.firstName);
    this.clientFormGroup.controls['lastName'].setValue(client.lastName);
    this.clientFormGroup.controls['phoneNumber'].setValue(client.phoneNumber);
    this.clientFormGroup.controls['email'].setValue(client.email);
    this.clientFormGroup.controls['street'].setValue(client.street);
    this.clientFormGroup.controls['code'].setValue(client.code);
    this.clientFormGroup.controls['city'].setValue(client.city);

  }

  public setVehicleForm(vehicle: Vehicle) {
    this.vehicleFormGroup.controls['brand'].setValue(vehicle.brand);
    this.vehicleFormGroup.controls['model'].setValue(vehicle.model);
    this.vehicleFormGroup.controls['registrationNumber'].setValue(vehicle.registrationNumber);

    this.currentClientList = this.clientList.filter(client =>
      client.id === vehicle.clientId);
    if ( this.currentClientList.length === 0) {
      this.hasOwner = false;
    } else {
      this.hasOwner = true;
    }
  }

  public applyFilter(filterValue: string) {
    this.filterValue = filterValue;
    this.currentVehicleList = this.vehicleList.filter(vehicle =>
      vehicle.registrationNumber.trim().toLowerCase().match(this.filterValue.trim().toLowerCase()));
  }

  getClients() {
    this.clientService.getClients()
    .subscribe(clients => {
        this.clientList = clients as Client[];
    });
  }

  getVehicles() {
    this.vehicleService.getVehicles()
    .subscribe(vehicles => {
        this.vehicleList = vehicles as Vehicle[];
    });
    this.currentVehicleList = this.vehicleList;
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import { RepairService } from 'src/app/shared/services/repair.service';
import { ClientService } from 'src/app/shared/services/client.service';
import { VehicleService } from 'src/app/shared/services/vehicle.service';
import { Client } from 'src/app/shared/models/Client';
import { Vehicle } from 'src/app/shared/models/Vehicle';
import { of } from 'rxjs';
import { RepairForCreation } from 'src/app/shared/models/RepairForCreation';
import { CreateRepairModel } from 'src/app/shared/models/CreateRepairModel';

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
  currentRepair: CreateRepairModel;

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

    this.currentRepair = new CreateRepairModel();

    this.getVehicles();
    this.getClients();
  }

  public submit() {
    if (this.repairFormGroup.dirty) {
    this.repairService.addRepair(this.getRepairFromForm()).subscribe();
    this.repairFormGroup.reset();
    this.vehicleFormGroup.reset();
    this.clientFormGroup.reset();
    this.snackBar.open('Pomyślnie dodano naprawę', undefined, {
      duration: 2000,
    });

    this.currentRepair = new CreateRepairModel();

    this.getVehicles();
    this.getClients();
  }
  }

  public setClientForm(client: Client) {
    this.clientFormGroup.controls['firstName'].setValue(client.firstName);
    this.clientFormGroup.controls['lastName'].setValue(client.lastName);
    this.clientFormGroup.controls['phoneNumber'].setValue(client.phoneNumber);
    this.clientFormGroup.controls['email'].setValue(client.email);
    this.clientFormGroup.controls['street'].setValue(client.street);
    this.clientFormGroup.controls['code'].setValue(client.code);
    this.clientFormGroup.controls['city'].setValue(client.city);

    this.currentRepair.client.id = client.id;
  }

  public setVehicleForm(vehicle: Vehicle) {
    this.vehicleFormGroup.controls['brand'].setValue(vehicle.brand);
    this.vehicleFormGroup.controls['model'].setValue(vehicle.model);
    this.vehicleFormGroup.controls['registrationNumber'].setValue(vehicle.registrationNumbers);

    this.currentClientList = this.clientList.filter(client =>
      client.id === vehicle.clientId);
    if ( this.currentClientList.length === 0) {
      this.hasOwner = false;
    } else {
      this.hasOwner = true;
    }

    this.currentRepair.vehicle.id = vehicle.id;
  }

  public applyFilter(filterValue: string) {
    this.filterValue = filterValue;
    this.currentVehicleList = this.vehicleList.filter(vehicle =>
      vehicle.registrationNumbers.trim().toLowerCase().match(this.filterValue.trim().toLowerCase()));

      if ( this.currentVehicleList.length === 1 ) {
        this.currentClientList = this.clientList.filter(client =>
          client.id === this.currentVehicleList[0].clientId);
        if ( this.currentClientList.length === 0) {
          this.hasOwner = false;
        } else {
          this.hasOwner = true;
        }
      }
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

  getRepairFromForm(): CreateRepairModel {
    this.currentRepair.repair.description = this.repairFormGroup.controls['description'].value;
    this.currentRepair.vehicle.registrationNumbers = this.vehicleFormGroup.controls['registrationNumber'].value;
    this.currentRepair.vehicle.brand = this.vehicleFormGroup.controls['brand'].value;
    this.currentRepair.vehicle.model = this.vehicleFormGroup.controls['model'].value;
    this.currentRepair.client.firstName = this.clientFormGroup.controls['firstName'].value;
    this.currentRepair.client.lastName = this.clientFormGroup.controls['lastName'].value;
    this.currentRepair.client.email = this.clientFormGroup.controls['email'].value;
    this.currentRepair.client.phoneNumber = this.clientFormGroup.controls['phoneNumber'].value;
    this.currentRepair.client.street = this.clientFormGroup.controls['street'].value;
    this.currentRepair.client.city = this.clientFormGroup.controls['city'].value;
    this.currentRepair.client.code = this.clientFormGroup.controls['code'].value;
    return this.currentRepair;
  }
}

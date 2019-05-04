import { Injectable } from '@angular/core';
import { Vehicle } from '../models/Vehicle';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  vehicles: Vehicle[] = [
    {id: '1', brand: 'Seat', model: 'Ibiza', clientId: '1', registrationNumber: 'SPS 222333'},
    {id: '2', brand: 'Seat', model: 'Leon', clientId: '1', registrationNumber: 'SPS 222333'},
    {id: '3', brand: 'Opel', model: 'Astra', clientId: '2', registrationNumber: 'SPS 222333'}
];

  getVehicles(): Observable<Vehicle[]> {
    return of(this.vehicles);
  }

  constructor() { }
}

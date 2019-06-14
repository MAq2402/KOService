import { Injectable } from '@angular/core';
import { Vehicle } from '../models/Vehicle';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private url = 'https://localhost:44340/api/vehicles/';

  vehicles: Vehicle[] = [
    {id: '1', brand: 'Seat', model: 'Ibiza', clientId: '1', registrationNumber: 'SPS 222332'},
    {id: '2', brand: 'Seat', model: 'Leon', clientId: '1', registrationNumber: 'SPS 222333'},
    {id: '3', brand: 'Opel', model: 'Astra', clientId: '72', registrationNumber: 'SPS 222334'}
];

  _getVehicles(): Observable<Vehicle[]> {
    return of(this.vehicles);
  }

  getVehicles(): Observable<Vehicle[]> {
    return this.httpClient.get<Vehicle[]>(this.url);
  }

  constructor(private httpClient: HttpClient) { }
}

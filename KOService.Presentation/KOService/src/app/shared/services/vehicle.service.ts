import { Injectable } from '@angular/core';
import { Vehicle } from '../models/Vehicle';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private url = 'https://localhost:44340/api/vehicles/';

  getVehicles(): Observable<Vehicle[]> {
    return this.httpClient.get<Vehicle[]>(this.url);
  }

  constructor(private httpClient: HttpClient) { }
}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RepairStatus } from '../enums/repair-status';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Repair } from '../models/repair.model';
import { Client } from '../models/Client';
import { Vehicle } from '../models/Vehicle';
import { RepairForCreation } from '../models/RepairForCreation';

@Injectable({
  providedIn: 'root'
})
export class RepairService {

  private url = 'https://localhost:44340/api/repairs/';
  // private managerId: string;

  constructor(private httpClient: HttpClient) {
  }

  getRepairs(managerId: string, statusQuery = ''): Observable<Repair[]> {
    // this.managerId = managerId;
    return this.httpClient.get<Repair[]>(this.url + managerId, {params: new HttpParams().set('status', statusQuery)});
  }

  addRepair(repair: RepairForCreation): Observable<any> {
    // repair.managerId = this.managerId;
    return this.httpClient.post(this.url, repair);
  }
}

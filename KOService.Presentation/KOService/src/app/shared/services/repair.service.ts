import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { Repair } from '../models/repair.model';
import { CreateRepairModel } from '../models/CreateRepairModel';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { RepairInfo } from '../models/repair-info.model';
import { CancelModel } from 'src/app/manager/models/cancel.model';
import { FinishModel } from 'src/app/manager/models/finish.model';
import { RepairStatus } from '../enums/repair-status.enum';
import { PricingCreation } from '../models/pricing-creation.model';
import { Pricing } from '../models/pricing.model';
import { RepairForClient } from '../models/repair-for-client.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class RepairService {

  repair: RepairInfo = {
    description: 'x',
    result: 'xd',
    status: RepairStatus.Open,
    startDateTime: new Date(),
    endDateTime: new Date(),
    vehicleRegistrationNumbers: 'SPS34563',
    vehicleBrand: 'Ford',
    vehicleModel: 'Focus',
    clientName: 'x',
    clientEmail: 'x',
    clientPhoneNumber: 'x'
  };

  private url = 'https://localhost:44340/api/repairs/';

  constructor(private httpClient: HttpClient) {
  }

  getRepairs(statusQuery = ''): Observable<Repair[]> {
    return this.httpClient.get<Repair[]>(this.url, { params: new HttpParams().set('status', statusQuery) });
  }


  addRepair(repair: CreateRepairModel): Observable<any> {
    return this.httpClient.post<any>(this.url, repair);
  }

  getRepairInfo(repairId): Observable<RepairInfo> {
    return this.httpClient.get<RepairInfo>(this.url + 'info/' + repairId);
  }


  cancel(repairId: string, cancelModel: CancelModel): Observable<any> {
    return this.httpClient.put<any>(`${this.url}${repairId}/cancel`, cancelModel);
  }

  finish(repairId: string, finishModel: FinishModel): Observable<any> {
    return this.httpClient.put<any>(`${this.url}${repairId}/finish`, finishModel);
  }

  changeToInProgress(repairId: string): Observable<any> {
    return this.httpClient.put<any>(`${this.url}${repairId}/changeToInProgress`, {});
  }
  addRepairPricing(pricing: PricingCreation, repairId: string): Observable<PricingCreation> {
    return this.httpClient.post<PricingCreation>(this.url + 'pricing/' + repairId, pricing, httpOptions);
  }
 
}

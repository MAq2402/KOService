import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Repair } from '../models/repair.model';
import { RepairInfo } from '../models/repair-info.model';
import { PricingCreation } from '../models/pricing-creation.model';
import { FinishModel } from 'src/app/manager/models/finish.model';
import { CancelModel } from 'src/app/manager/models/cancel.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class RepairService {

  private url = 'https://localhost:44340/api/repairs/';

  constructor(private httpClient: HttpClient) {
  }

  getRepairs(statusQuery = ''): Observable<Repair[]> {
    return this.httpClient.get<Repair[]>(this.url, { params: new HttpParams().set('status', statusQuery) });
  }

  getRepairInfo(repairId): Observable<RepairInfo> {
    return this.httpClient.get<RepairInfo>(this.url + "info/" + repairId);
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
  addRepairPricing(pricing: PricingCreation, repairId: string): Observable<PricingCreation>{
    return this.httpClient.post<PricingCreation>(this.url + "pricing/" + repairId,pricing,httpOptions)
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Repair } from '../models/repair.model';
import { RepairInfo } from '../models/repair-info.model';
import { PricingCreation } from '../models/pricing-creation.model';

@Injectable({
  providedIn: 'root'
})
export class RepairService {

  private url = 'https://localhost:44340/api/repairs/';


  constructor(private httpClient: HttpClient) {
  }

  getRepairs(statusQuery = ''): Observable<Repair[]> {
    return this.httpClient.get<Repair[]>(this.url, {params: new HttpParams().set('status', statusQuery)});
  }
  getRepairInfo(repairId): Observable<RepairInfo>{
    return this.httpClient.get<RepairInfo>(this.url + "info/"+ repairId);
  }
  //addRepairPricing(pricing: PricingCreation): Observable<Pricing>{

  //}
}

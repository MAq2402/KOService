import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Repair } from '../models/repair.model';
import { RepairInfo } from '../models/repair-info.model';
import { CancelModel } from 'src/app/manager/models/cancel.model';
import { FinishModel } from 'src/app/manager/models/finish.model';

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
}

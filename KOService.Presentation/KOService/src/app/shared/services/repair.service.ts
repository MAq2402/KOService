import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { RepairStatus } from '../enums/repair-status';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Repair } from '../models/repair.model';

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

  getRepair(id: string): Observable<Repair> {
    return this.httpClient.get<Repair>(this.url + id);
  }
}

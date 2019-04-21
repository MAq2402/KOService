import { Injectable } from '@angular/core';
import {Repair} from '../models/Repair'

import { Observable, of } from 'rxjs';
import { RepairStatus } from '../enums/repair-status';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RepairService {

  private url = 'https://localhost:44340/api/repairs/';


constructor(private httpClient: HttpClient) {
}

  getRepairs(): Observable<Repair[]> {
    return this.httpClient.get<Repair[]>(this.url);
  }
}

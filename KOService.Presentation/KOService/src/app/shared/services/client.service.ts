

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RepairForClient } from '../models/repair-for-client.model';
import { Observable } from 'rxjs';
import { Client } from '../models/Client';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
  
@Injectable({
    providedIn: 'root'
})
export class ClientService {
  
    private baseUrl = 'https://localhost:44340/api/clients/';
    constructor(private httpClient: HttpClient){}

    getRepairForClient(repairNumber: string): Observable<RepairForClient>{
        return this.httpClient.get<RepairForClient>(this.baseUrl + 'repair/' + repairNumber);
    }
    acceptPricing(repairNumber: string): Observable<any>{
        return this.httpClient.put<any>(this.baseUrl + "pricing/" + repairNumber + "/accept", {});
    }
    rejectPricing(repairNumber: string): Observable<any>{
        return this.httpClient.put<any>(this.baseUrl + "pricing/" + repairNumber + "/reject", {});
    }

    getClients(): Observable<Client[]> {
        return this.httpClient.get<Client[]>(this.baseUrl);
    }

}


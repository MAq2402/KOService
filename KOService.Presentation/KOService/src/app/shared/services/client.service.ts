import { Injectable } from '@angular/core';
import { Client } from '../models/Client';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private url = 'https://localhost:44340/api/clients/';

  getClients(): Observable<Client[]> {
    return this.httpClient.get<Client[]>(this.url);
  }

  constructor(private httpClient: HttpClient) { }
}

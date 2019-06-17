import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Valuation, Part } from '../models/valuation.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ValuationService {

  private baseUrl = 'https://localhost:44340/api/client/';
  parts: Part[] = [
    {name: 'olej', cost: '50'},
    {name: 'lakier', cost: '550'},
    {name: 'akumulator', cost: '350'}
  ];
  valuation: Valuation = {
    repairId: '1',
    laborCosts: '250',
    parts: this.parts
  };

  constructor(private httpClient: HttpClient) {}

  getValuation(id: string): Valuation {
    return this.valuation;
  }

  acceptValuation() {
    console.log('si');
  }

  declineValuation() {
    console.log('no');
  }

}

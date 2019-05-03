import { Injectable } from '@angular/core';
import { Client } from '../models/Client';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clients: Client[] = [
    {id: '1', firstName: 'Bartek', lastName: 'Caban', phoneNumber: '999999999', email: 'xd@domena.com',
    street: 'Pszczyńska', code: '20', city: 'Gliwice'},
    {id: '2', firstName: 'Bartek', lastName: 'Miciak', phoneNumber: '999999999', email: 'xd@domena.com',
    street: 'Pszczyńska', code: '20', city: 'Gliwice'},
    {id: '3', firstName: 'Bartek', lastName: 'Kuś', phoneNumber: '999999999', email: 'xd@domena.com',
    street: 'Pszczyńska', code: '20', city: 'Gliwice'},
    {id: '4', firstName: 'Bartek', lastName: 'Caban', phoneNumber: '999999999', email: 'xd@domena.com',
    street: 'Pszczyńska', code: '20', city: 'Gliwice'},
    {id: '5', firstName: 'Bartek', lastName: 'Miciak', phoneNumber: '999999999', email: 'xd@domena.com',
    street: 'Pszczyńska', code: '20', city: 'Gliwice'},
    {id: '6', firstName: 'Bartek', lastName: 'Kuś', phoneNumber: '999999999', email: 'xd@domena.com',
    street: 'Pszczyńska', code: '20', city: 'Gliwice'},
    {id: '7', firstName: 'Bartek', lastName: 'Caban', phoneNumber: '999999999', email: 'xd@domena.com',
    street: 'Pszczyńska', code: '20', city: 'Gliwice'},
    {id: '8', firstName: 'Bartek', lastName: 'Miciak', phoneNumber: '999999999', email: 'xd@domena.com',
    street: 'Pszczyńska', code: '20', city: 'Gliwice'},
    {id: '9', firstName: 'Bartek', lastName: 'Kuś', phoneNumber: '999999999', email: 'xd@domena.com',
    street: 'Pszczyńska', code: '20', city: 'Gliwice'}
];

  getClients(): Observable<Client[]> {
    return of(this.clients);
  }

  constructor() { }
}

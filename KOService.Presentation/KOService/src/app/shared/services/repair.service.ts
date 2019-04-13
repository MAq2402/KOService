import { Injectable } from '@angular/core';
import {Repair} from '../models/Repair'

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RepairService {

    repairs:Repair[] = [{id: '1',
    carId: '1',
    carBrand: 'Ferrari',
    carNumbers: 'qwerty1'}];

    
  getRepairs(): Observable<Repair[]>{
     return of(this.repairs);
  }
  
  constructor() { }
}
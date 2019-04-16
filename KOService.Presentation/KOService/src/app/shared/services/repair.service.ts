import { Injectable } from '@angular/core';
import {Repair} from '../models/Repair'

import { Observable, of } from 'rxjs';
import { RepairStatus } from '../enums/repair-status';

@Injectable({
  providedIn: 'root'
})
export class RepairService {

    repairs:Repair[] = [{id: '1',
    carId: '1',
    carBrand: 'Ferrari',
    carNumbers: 'qwerty1',
    description: "opis naprawy",
    result: "",
    status: RepairStatus.Open,
    statusDisplay: "Otwarta",
    startDateTime: "10.04.2019",
    endDateTime: null

}];

    
  getRepairs(): Observable<Repair[]>{
     return of(this.repairs);
  }
  
  constructor() { }
}
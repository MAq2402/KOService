import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Role} from '../enums/Role'
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'https://localhost:44340/api/Employees/';

  constructor(private http: HttpClient) { }

  getEmployeeByIdentityId(identityId): Observable<Employee> {
    return this.http.get<Employee>(this.baseUrl + identityId);
  }

  getEmployeesByRole(role: Role): Observable<Employee>{
    return this.http.get<Employee>(this.baseUrl);
  }
}

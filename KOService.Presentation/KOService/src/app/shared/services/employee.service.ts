import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/Employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'https://localhost:44340/api/Employees/';

  constructor(private http: HttpClient) { }

  getEmployeeByIdentityId(identityId): Observable<Employee> {
    return this.http.get<Employee>(this.baseUrl + identityId);
  }
}

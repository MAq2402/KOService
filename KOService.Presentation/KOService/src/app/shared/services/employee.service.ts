import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { EmployeeWithAccountInfo } from '../models/employeeWithAccountInfo.model';
import { RegisterEmployee } from '../models/register.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'https://localhost:44340/api/employees';  
  private userUrl = 'https://localhost:44340/api/user';

  constructor(private http: HttpClient) { }

  getEmployees(role = null): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl, { params: new HttpParams().set('role', role ? role.toString() : null) });
  }

  getEmployee(id: string): Observable<EmployeeWithAccountInfo> {
    return this.http.get<EmployeeWithAccountInfo>(this.baseUrl + '/' + id.toString(), {params: new HttpParams().set('id', id ? id.toString() : null)});
  }

  terminate(id: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}\\${id}\\terminate`, {});
  }

  addEmployee(model: RegisterEmployee): Observable<void> {
    return this.http.post<void>('https://localhost:44340/api/register', model);
  }
}

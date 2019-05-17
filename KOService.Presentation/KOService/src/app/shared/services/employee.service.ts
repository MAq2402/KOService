import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'https://localhost:44340/api/employees';

  constructor(private http: HttpClient) { }

  getEmployees(role = null): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl, { params: new HttpParams().set('role', role ? role.toString() : null) });
  }

  terminate(id: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}\\${id}\\terminate`, {});
  }
}

import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { EMPLOYEES } from './mock/mock-employees';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  url = 'http://localhost:3000/Employees';
  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url);
    //const employees = of(EMPLOYEES);
    //return employees;
  }
}

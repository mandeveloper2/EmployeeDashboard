import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { EMPLOYEES } from './mock/mock-employees';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  url = 'http://localhost:3000/Employees';
  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    let apiObserverable = this.http.get<Employee[]>(this.url);
    return apiObserverable.pipe(catchError(error => of<Employee[]>([])));
    //const employees = of(EMPLOYEES);
    //return employees;
  }
}

import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { EMPLOYEES } from '../mock/mock-employees';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['EmployeeId', 'EmployeeName', 'Department', 'Salary'];

  employees: Employee[] = [];
  selectedEmployee?: Employee;
  threshold: number = 60000;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees()
      .subscribe(employees => this.employees = employees);
  }

  isSalaryGreaterThenThreshold(salary: number): boolean {
    return salary > this.threshold;
  }

  isDeptHR(dept: string): boolean{
    return dept == 'HR';
  }
}

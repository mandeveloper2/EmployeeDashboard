import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        HttpClientTestingModule,
        MatTableModule,
      ],
      declarations: [DashboardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Dashboard component', () => {
    void expect(component).toBeTruthy();
  });

  it('should call getAllEmployees if service call is success', () => {
  let employeeService = TestBed.inject(EmployeeService);

    const mockEmployeeResponse: Employee[] = [
      {
        "EmployeeId": 12345,
        "EmployeeName": "Test Data",
        "Department": "IT",
        "Salary": 55000.34
      }
    ];
    const getEmployeesSpy = jest.spyOn(employeeService, 'getEmployees').mockImplementation(() => of(mockEmployeeResponse));

    component.ngOnInit();
    void expect(getEmployeesSpy).toHaveBeenCalledTimes(1);
  });

  it('should return true if Employee Salary greater than 60000', () => {
    let salary: number = 64000;
    let returnValue = component.isSalaryGreaterThenThreshold(salary);

    void expect(returnValue).toBe(true);
  });

  it('should return false if Employee Salary less than 60000', () => {
    let salary: number = 54000;
    let returnValue = component.isSalaryGreaterThenThreshold(salary);

    void expect(returnValue).toBe(false);
  });

  it('should return true if Employee Department is HR', () => {
    
    let returnValue = component.isDeptHR("HR");

    void expect(returnValue).toBe(true);
  });

  it('should return false if Employee Department is IT', () => {
    
    let returnValue = component.isDeptHR("IT");

    void expect(returnValue).toBe(false);
  });
});

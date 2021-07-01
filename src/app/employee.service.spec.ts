import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EmployeeService } from './employee.service';
import { Employee } from './employee';

describe('EmployeeService', () => {
  let httpTestingController: HttpTestingController;
  let service: EmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    });

    httpTestingController = TestBed.inject(HttpTestingController);

    service = TestBed.inject(EmployeeService);
  });

  it('#getEmployees should return expected data', (done) => {
    const expectedEmployeeData: Employee[] = [
      {
        "EmployeeId": 12345,
        "EmployeeName": "Test Data",
        "Department": "IT",
        "Salary": 55000.34
      }
    ];

    service.getEmployees().subscribe(data => {
      expect(data).toEqual(expectedEmployeeData);
      done();
    });

    const testRequest = httpTestingController.expectOne('http://localhost:3000/Employees');

    testRequest.flush(expectedEmployeeData);
  });

  it('#getEmployees should return an empty object on error', (done) => {
    const expectedData: Employee[] = []

    service.getEmployees().subscribe(data => {
      expect(data).toEqual(expectedData);
      done();
    });

    const testRequest = httpTestingController.expectOne('http://localhost:3000/Employees');

    testRequest.flush('error', { status: 500, statusText: 'Broken Service' });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://localhost:3000/employees';

  constructor(private _http: HttpClient) { }

  // Fetch the current employee count
  getEmployeeCount(): Observable<number> {
    return this._http.get<any[]>(this.apiUrl).pipe(
      map((employees) => employees.length) // Count the number of employees
    );
  }

  // Add a new employee with an incremented ID
  addEmployee(data: any): Observable<any> {
    return this.getEmployeeCount().pipe(
      switchMap((count) => {
        const employeeWithId = { ...data, id: count }; // Set ID as (length + 1)
        return this._http.post(this.apiUrl, employeeWithId);
      })
    );
  }
}

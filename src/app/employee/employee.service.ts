import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseListFilter } from '../model/BaseListFilter';
import { BaseListResponse } from '../model/BaseListResponse';
import { removeNullAndUndefined } from '../shared/utils/helpers';
import { Employee } from '../model/Employee';
import { TransformCompanyToBeSaved } from '../model/base';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private httpClient: HttpClient) {}

  createEmployee(
    employee: TransformCompanyToBeSaved<Employee>
  ): Observable<Employee> {
    return this.httpClient.post<Employee>('employee/create/', employee);
  }

  fetchEmployeeList(
    filter: BaseListFilter
  ): Observable<BaseListResponse<Employee>> {
    return this.httpClient.get<BaseListResponse<Employee>>('employee/', {
      params: removeNullAndUndefined({
        page: filter.page,
        page_size: filter.size,
        search: filter.search,
      }) as any,
    });
  }

  deleteEmployeeById(id: number): Observable<void> {
    return this.httpClient.delete<void>(`employee/${id}/`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseListFilter } from '../model/BaseListFilter';
import { BaseListResponse } from '../model/BaseListResponse';
import { removeNullAndUndefined } from '../shared/utils/helpers';
import { Department } from '../model/Department';
import { TransformCompanyToBeSaved } from '../model/base';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor(private httpClient: HttpClient) {}

  createDepartment(
    department: TransformCompanyToBeSaved<Department>
  ): Observable<Department> {
    return this.httpClient.post<Department>(
      'resources/department/',
      department
    );
  }

  fetchDepartmentList(
    filter: BaseListFilter
  ): Observable<BaseListResponse<Department>> {
    return this.httpClient.get<BaseListResponse<Department>>(
      'resources/department/',
      {
        params: removeNullAndUndefined({
          page: filter.page,
          page_size: filter.size,
          search: filter.search,
        }) as any,
      }
    );
  }

  deleteDepartmentById(id: number): Observable<void> {
    return this.httpClient.delete<void>(`resources/department/${id}/`);
  }
}

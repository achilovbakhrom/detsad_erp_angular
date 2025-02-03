import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseListFilter } from '../model/BaseListFilter';
import { Observable } from 'rxjs';
import { BaseListResponse } from '../model/BaseListResponse';
import { Salary, SalaryInput } from '../model/Salary';
import { removeNullAndUndefined } from '../shared/utils/helpers';

@Injectable({
  providedIn: 'root',
})
export class SalaryService {
  constructor(private httpClient: HttpClient) {}

  fetchSalaryList(
    filter: BaseListFilter
  ): Observable<BaseListResponse<Salary>> {
    return this.httpClient.get<BaseListResponse<Salary>>('salary/', {
      params: removeNullAndUndefined({
        page: filter.page,
        page_size: filter.size,
        search: filter.search,
        company_id: filter.company,
      }) as any,
    });
  }

  deleteSalaryById(id: number): Observable<void> {
    return this.httpClient.delete<void>(`salary/${id}/delete/`);
  }

  createSalary(salary: SalaryInput): Observable<Salary> {
    return this.httpClient.post<Salary>('salary/create/', salary);
  }
}

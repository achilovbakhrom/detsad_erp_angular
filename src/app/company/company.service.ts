import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../model/company';
import { BaseListFilter } from '../model/BaseListFilter';
import { BaseListResponse } from '../model/BaseListResponse';
import { removeNullAndUndefined } from '../shared/utils/helpers';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private httpClient: HttpClient) {}

  createCompany(company: Company): Observable<Company> {
    return this.httpClient.post<Company>('company/', company);
  }

  fetchCompanyList(
    filter: BaseListFilter
  ): Observable<BaseListResponse<Company>> {
    return this.httpClient.get<BaseListResponse<Company>>('company/', {
      params: removeNullAndUndefined({
        page: filter.page,
        page_size: filter.size,
        search: filter.search,
      }) as any,
    });
  }

  deleteCompanyById(id: number): Observable<void> {
    return this.httpClient.delete<void>(`company/${id}/`);
  }
}

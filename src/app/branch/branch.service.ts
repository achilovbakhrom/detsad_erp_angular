import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Branch } from '../model/Branch';
import { Observable } from 'rxjs';
import { BaseListFilter } from '../model/BaseListFilter';
import { BaseListResponse } from '../model/BaseListResponse';
import { removeNullAndUndefined } from '../shared/utils/helpers';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  constructor(private httpClient: HttpClient) {}

  createBranch(
    branch: Omit<Branch, 'company'> & { company?: number }
  ): Observable<Branch> {
    return this.httpClient.post<Branch>('branch/create/', branch);
  }

  fetchBranchList(
    filter: BaseListFilter
  ): Observable<BaseListResponse<Branch>> {
    return this.httpClient.get<BaseListResponse<Branch>>('branch/', {
      params: removeNullAndUndefined({
        page: filter.page,
        page_size: filter.size,
        search: filter.search,
      }) as any,
    });
  }

  deleteBranchById(id: number): Observable<void> {
    return this.httpClient.delete<void>(`branch/${id}/`);
  }
}

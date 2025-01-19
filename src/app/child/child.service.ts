import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseListFilter } from '../model/BaseListFilter';
import { BaseListResponse } from '../model/BaseListResponse';
import { removeNullAndUndefined } from '../shared/utils/helpers';
import { Child } from '../model/Child';
import { TransformCompanyToBeSaved } from '../model/base';

@Injectable({
  providedIn: 'root',
})
export class ChildService {
  constructor(private httpClient: HttpClient) {}

  createChild(child: TransformCompanyToBeSaved<Child>): Observable<Child> {
    return this.httpClient.post<Child>('child/', child);
  }

  fetchChildList(filter: BaseListFilter): Observable<BaseListResponse<Child>> {
    return this.httpClient.get<BaseListResponse<Child>>('child/', {
      params: removeNullAndUndefined({
        page: filter.page,
        page_size: filter.size,
        search: filter.search,
        company_id: filter.company,
      }) as any,
    });
  }

  deleteChildById(id: number): Observable<void> {
    return this.httpClient.delete<void>(`child/${id}/`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseListFilter } from '../model/BaseListFilter';
import { BaseListResponse } from '../model/BaseListResponse';
import { removeNullAndUndefined } from '../shared/utils/helpers';
import { Reason } from '../model/Reason';
import { TransformCompanyToBeSaved } from '../model/base';

@Injectable({
  providedIn: 'root',
})
export class ReasonService {
  constructor(private httpClient: HttpClient) {}

  createReason(reason: TransformCompanyToBeSaved<Reason>): Observable<Reason> {
    return this.httpClient.post<Reason>('resources/reason/', reason);
  }

  fetchReasonList(
    filter: BaseListFilter
  ): Observable<BaseListResponse<Reason>> {
    return this.httpClient.get<BaseListResponse<Reason>>('resources/reason/', {
      params: removeNullAndUndefined({
        page: filter.page,
        page_size: filter.size,
        search: filter.search,
      }) as any,
    });
  }

  deleteReasonById(id: number): Observable<void> {
    return this.httpClient.delete<void>(`resources/reason/${id}/`);
  }
}

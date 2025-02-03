import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseListFilter } from '../model/BaseListFilter';
import { Observable } from 'rxjs';
import { BaseListResponse } from '../model/BaseListResponse';
import { SickLeave, SickLeaveInput } from '../model/SickLeave';
import { removeNullAndUndefined } from '../shared/utils/helpers';

@Injectable({
  providedIn: 'root',
})
export class SickLeaveService {
  constructor(private httpClient: HttpClient) {}

  fetchSickLeaveList(
    filter: BaseListFilter
  ): Observable<BaseListResponse<SickLeave>> {
    return this.httpClient.get<BaseListResponse<SickLeave>>('sick-leave/', {
      params: removeNullAndUndefined({
        page: filter.page,
        page_size: filter.size,
        search: filter.search,
        company_id: filter.company,
      }) as any,
    });
  }

  deleteSickLeaveById(id: number): Observable<void> {
    return this.httpClient.delete<void>(`sick-leave/${id}/delete/`);
  }

  createSickLeave(sicLeave: SickLeaveInput): Observable<SickLeave> {
    return this.httpClient.post<SickLeave>('sick-leave/create/', sicLeave);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseListFilter } from '../model/BaseListFilter';
import { Observable } from 'rxjs';
import { BaseListResponse } from '../model/BaseListResponse';
import { Cashbox, CashboxInput } from '../model/Cashbox';
import { removeNullAndUndefined } from '../shared/utils/helpers';

@Injectable({
  providedIn: 'root',
})
export class CashboxService {
  constructor(private httpClient: HttpClient) {}

  fetchCashboxList(
    filter: BaseListFilter
  ): Observable<BaseListResponse<Cashbox>> {
    return this.httpClient.get<BaseListResponse<Cashbox>>('cashbox/', {
      params: removeNullAndUndefined({
        page: filter.page,
        page_size: filter.size,
        search: filter.search,
        company_id: filter.company,
      }) as any,
    });
  }

  deleteCashboxById(id: number): Observable<void> {
    return this.httpClient.delete<void>(`cashbox/${id}/delete/`);
  }

  createCashbox(arg: CashboxInput): Observable<Cashbox> {
    return this.httpClient.post<Cashbox>('cashbox/create/', arg);
  }
}

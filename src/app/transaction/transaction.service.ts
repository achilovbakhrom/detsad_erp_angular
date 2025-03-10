import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseListFilter } from '../model/BaseListFilter';
import { Observable } from 'rxjs';
import { BaseListResponse } from '../model/BaseListResponse';
import { Transaction, TransactionInput } from '../model/Transaction';
import { removeNullAndUndefined } from '../shared/utils/helpers';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private httpClient: HttpClient) {}

  fetchTransactionList(
    filter: BaseListFilter
  ): Observable<BaseListResponse<Transaction>> {
    return this.httpClient.get<BaseListResponse<Transaction>>('transaction/', {
      params: removeNullAndUndefined({
        page: filter.page,
        page_size: filter.size,
        search: filter.search,
      }) as any,
    });
  }

  deleteTransactionById(id: number): Observable<void> {
    return this.httpClient.delete<void>(`transaction/${id}/`);
  }

  createTransaction(arg: TransactionInput): Observable<Transaction> {
    return this.httpClient.post<Transaction>('transaction/create/', arg);
  }
}

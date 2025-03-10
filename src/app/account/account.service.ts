import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransformCompanyToBeSaved } from '../model/base';
import { Account } from '../model/Account';
import { Observable } from 'rxjs';
import { BaseListFilter } from '../model/BaseListFilter';
import { BaseListResponse } from '../model/BaseListResponse';
import { removeNullAndUndefined } from '../shared/utils/helpers';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private httpClient: HttpClient) {}

  createAccount(
    account: TransformCompanyToBeSaved<Account>
  ): Observable<Account> {
    return this.httpClient.post<Account>('resources/account/', account);
  }

  fetchAccountList(
    filter: BaseListFilter
  ): Observable<BaseListResponse<Account>> {
    return this.httpClient.get<BaseListResponse<Account>>(
      'resources/account/',
      {
        params: removeNullAndUndefined({
          page: filter.page,
          page_size: filter.size,
          search: filter.search,
        }) as any,
      }
    );
  }

  deleteAccountById(id: number): Observable<void> {
    return this.httpClient.delete<void>(`resources/account/${id}/`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseListFilter } from '../model/BaseListFilter';
import { Subscription, SubscriptionInput } from '../model/Subscription';
import { BaseListResponse } from '../model/BaseListResponse';
import { Observable } from 'rxjs';
import { removeNullAndUndefined } from '../shared/utils/helpers';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  constructor(private httpClient: HttpClient) {}

  fetchSubscriptionList(
    filter: BaseListFilter
  ): Observable<BaseListResponse<Subscription>> {
    return this.httpClient.get<BaseListResponse<Subscription>>(
      'subscription/list/',
      {
        params: removeNullAndUndefined({
          page: filter.page,
          page_size: filter.size,
          search: filter.search,
        }) as any,
      }
    );
  }

  deleteSubscriptionById(id: number): Observable<void> {
    return this.httpClient.delete<void>(`subscription/${id}/`);
  }

  createSubscription(arg: SubscriptionInput): Observable<Subscription> {
    return this.httpClient.post<Subscription>('subscription/create/', arg);
  }
}

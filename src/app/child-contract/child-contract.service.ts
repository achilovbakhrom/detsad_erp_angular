import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseListFilter } from '../model/BaseListFilter';
import { Observable } from 'rxjs';
import { BaseListResponse } from '../model/BaseListResponse';
import {
  ChildContract,
  ChildContractInput,
  ChildContractStatus,
} from '../model/ChildContract';
import { removeNullAndUndefined } from '../shared/utils/helpers';

@Injectable({
  providedIn: 'root',
})
export class ChildContractService {
  constructor(private httpClient: HttpClient) {}

  fetchChildContractList(
    filter: BaseListFilter & {
      branch_id?: number;
      group_registration_id?: number;
    }
  ): Observable<BaseListResponse<ChildContract>> {
    return this.httpClient.get<BaseListResponse<ChildContract>>(
      'child-contract/',
      {
        params: removeNullAndUndefined({
          page: filter.page,
          page_size: filter.size,
          search: filter.search,
          company_id: filter.company,
        }) as any,
      }
    );
  }

  fetchChildContractListByParent(
    filter: BaseListFilter & {
      branch_id?: number;
      group_registration_id?: number;
    }
  ): Observable<BaseListResponse<ChildContract>> {
    return this.httpClient.get<BaseListResponse<ChildContract>>(
      'child-contract/by-parent/',
      {
        params: removeNullAndUndefined({
          page: filter.page,
          page_size: filter.size,
          search: filter.search,
          company_id: filter.company,
          group_registration_id: filter.group_registration_id,
        }) as any,
      }
    );
  }

  changeChildContractStatusById(
    id: number,
    status: ChildContractStatus
  ): Observable<void> {
    return this.httpClient.put<void>(`child-contract/${id}/change-status/`, {
      status,
    });
  }

  deleteChildContractById(id: number): Observable<void> {
    return this.httpClient.delete<void>(`child-contract/${id}/delete/`);
  }

  createChildContract(
    childContract: ChildContractInput
  ): Observable<ChildContract> {
    return this.httpClient.post<ChildContract>(
      'child-contract/create/',
      childContract
    );
  }
}

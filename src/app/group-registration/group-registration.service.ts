import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseListFilter } from '../model/BaseListFilter';
import { Observable } from 'rxjs';
import { BaseListResponse } from '../model/BaseListResponse';
import {
  GroupRegistration,
  GroupRegistrationInput,
  GroupRegistrationStatus,
} from '../model/GroupRegistration';
import { removeNullAndUndefined } from '../shared/utils/helpers';

@Injectable({
  providedIn: 'root',
})
export class GroupRegistrationService {
  constructor(private httpClient: HttpClient) {}

  fetchGroupRegistrationList(
    filter: BaseListFilter
  ): Observable<BaseListResponse<GroupRegistration>> {
    return this.httpClient.get<BaseListResponse<GroupRegistration>>(
      'group-registration/',
      {
        params: removeNullAndUndefined({
          page: filter.page,
          page_size: filter.size,
          search: filter.search,
        }) as any,
      }
    );
  }

  changeGroupRegistrationStatusById(
    id: number,
    status: GroupRegistrationStatus
  ): Observable<void> {
    return this.httpClient.put<void>(
      `group-registration/${id}/change-status/`,
      {
        status,
      }
    );
  }

  deleteGroupRegistrationById(id: number): Observable<void> {
    return this.httpClient.delete<void>(`group-registration/${id}/delete/`);
  }

  createGroupRegistration(
    groupRegistration: GroupRegistrationInput
  ): Observable<GroupRegistration> {
    return this.httpClient.post<GroupRegistration>(
      'group-registration/create/',
      groupRegistration
    );
  }

  updateGroupRegistration(
    id: number,
    groupRegistration: GroupRegistrationInput
  ): Observable<GroupRegistration> {
    return this.httpClient.put<GroupRegistration>(
      `group-registration/${id}/update/`,
      groupRegistration
    );
  }
}

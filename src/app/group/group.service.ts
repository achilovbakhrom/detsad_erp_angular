import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseListFilter } from '../model/BaseListFilter';
import { BaseListResponse } from '../model/BaseListResponse';
import { removeNullAndUndefined } from '../shared/utils/helpers';
import { Group } from '../model/Group';
import { TransformCompanyToBeSaved } from '../model/base';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(private httpClient: HttpClient) {}

  createGroup(group: TransformCompanyToBeSaved<Group>): Observable<Group> {
    return this.httpClient.post<Group>('group/create/', group);
  }

  fetchGroupList(filter: BaseListFilter): Observable<BaseListResponse<Group>> {
    return this.httpClient.get<BaseListResponse<Group>>('group/', {
      params: removeNullAndUndefined({
        page: filter.page,
        page_size: filter.size,
        search: filter.search,
      }) as any,
    });
  }

  deleteGroupById(id: number): Observable<void> {
    return this.httpClient.delete<void>(`group/${id}/`);
  }
}

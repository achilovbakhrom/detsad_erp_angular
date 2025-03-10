import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseListFilter } from '../model/BaseListFilter';
import { BaseListResponse } from '../model/BaseListResponse';
import { removeNullAndUndefined } from '../shared/utils/helpers';
import { Position } from '../model/Position';
import { TransformCompanyToBeSaved } from '../model/base';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  constructor(private httpClient: HttpClient) {}

  createPosition(
    position: TransformCompanyToBeSaved<Position>
  ): Observable<Position> {
    return this.httpClient.post<Position>('resources/position/', position);
  }

  fetchPositionList(
    filter: BaseListFilter
  ): Observable<BaseListResponse<Position>> {
    return this.httpClient.get<BaseListResponse<Position>>(
      'resources/position/',
      {
        params: removeNullAndUndefined({
          page: filter.page,
          page_size: filter.size,
          search: filter.search,
        }) as any,
      }
    );
  }

  deletePositionById(id: number): Observable<void> {
    return this.httpClient.delete<void>(`resources/position/${id}/`);
  }
}

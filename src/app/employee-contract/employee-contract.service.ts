import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  EmployeeContract,
  EmployeeContractInput,
} from '../model/EmployeeContract';
import { Observable } from 'rxjs';
import { BaseListFilter } from '../model/BaseListFilter';
import { BaseListResponse } from '../model/BaseListResponse';
import { removeNullAndUndefined } from '../shared/utils/helpers';

@Injectable({
  providedIn: 'root',
})
export class EmployeeContractService {
  constructor(private httpClient: HttpClient) {}

  createEmployeeContract(
    contract: EmployeeContractInput
  ): Observable<EmployeeContract> {
    return this.httpClient.post<EmployeeContract>(
      'employee-contracts/create/',
      contract
    );
  }

  fetchEmployeeContractList(
    filter: BaseListFilter
  ): Observable<BaseListResponse<EmployeeContract>> {
    return this.httpClient.get<BaseListResponse<EmployeeContract>>(
      'employee-contracts/',
      {
        params: removeNullAndUndefined({
          page: filter.page,
          page_size: filter.size,
          search: filter.search,
        }) as any,
      }
    );
  }

  fetchEmployeeContractById(id: number): Observable<EmployeeContract> {
    return this.httpClient.get<EmployeeContract>(`employee-contracts/${id}/`);
  }

  deleteEmployeeContractById(id: number): Observable<void> {
    return this.httpClient.delete<void>(`employee-contracts/${id}/delete/`);
  }

  fireEmployeeContractById(id: number): Observable<void> {
    return this.httpClient.delete<void>(`employee-contracts/${id}/fire/`);
  }

  hireEmployeeContractById(id: number): Observable<void> {
    return this.httpClient.put<void>(`employee-contracts/${id}/hire/`, {});
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseListFilter } from '../model/BaseListFilter';
import { BaseListResponse } from '../model/BaseListResponse';
import { removeNullAndUndefined } from '../shared/utils/helpers';
import { PaymentType } from '../model/PaymentType';
import { TransformCompanyToBeSaved } from '../model/base';

@Injectable({
  providedIn: 'root',
})
export class PaymentTypeService {
  constructor(private httpClient: HttpClient) {}

  createPaymentType(
    paymentType: TransformCompanyToBeSaved<PaymentType>
  ): Observable<PaymentType> {
    return this.httpClient.post<PaymentType>(
      'resources/payment_type/',
      paymentType
    );
  }

  fetchPaymentTypeList(
    filter: BaseListFilter
  ): Observable<BaseListResponse<PaymentType>> {
    return this.httpClient.get<BaseListResponse<PaymentType>>(
      'resources/payment_type/',
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

  deletePaymentTypeById(id: number): Observable<void> {
    return this.httpClient.delete<void>(`resources/payment_type/${id}/`);
  }
}

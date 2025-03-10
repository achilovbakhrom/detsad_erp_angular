import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {
  deletePaymentTypeById,
  fetchPaymentTypeList,
  fetchPaymentTypeListError,
  fetchPaymentTypeListSuccess,
  savePaymentType,
  savePaymentTypeFailure,
  savePaymentTypeSuccess,
  setPage,
  setSize,
} from './payment-type.actions';

import { tap } from 'ramda';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../types';
import { selectPage, selectSize } from './payment-type.selectors';
import { selectCompany } from '../common/common.selectors';
import { PaymentTypeService } from '../../../payment-type/payment-type.service';

@Injectable()
export class PaymentTypeEffects {
  constructor(
    private actions$: Actions,
    private paymentTypeService: PaymentTypeService,
    private notificationService: NzNotificationService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  savePaymentType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(savePaymentType),
      withLatestFrom(this.store.select(selectCompany)),
      mergeMap(([action, company]) =>
        this.paymentTypeService
          .createPaymentType({ ...action.paymentType, company: company?.id })
          .pipe(
            map((paymentType) => {
              this.showSuccessMessage();
              this.goToPaymentTypeListPage();
              return savePaymentTypeSuccess({ paymentType });
            }),

            catchError((error) =>
              of(savePaymentTypeFailure({ error })).pipe(
                tap(() => this.showErrorMessage(error))
              )
            )
          )
      )
    )
  );

  fetchPaymentTypeList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchPaymentTypeList),
      withLatestFrom(
        this.store.select(selectPage),
        this.store.select(selectSize)
      ),

      switchMap(([_, page, size]) =>
        this.paymentTypeService.fetchPaymentTypeList({ page, size }).pipe(
          map((response) => fetchPaymentTypeListSuccess(response)),
          catchError((error) =>
            of(fetchPaymentTypeListError({ error })).pipe(
              tap(() => this.showErrorMessage(error))
            )
          )
        )
      )
    )
  );

  triggerLoadList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setPage, setSize),
      map(() => fetchPaymentTypeList())
    )
  );

  deletePaymentTypeById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletePaymentTypeById),
      mergeMap((action) =>
        this.paymentTypeService.deletePaymentTypeById(action.id).pipe(
          map(() => fetchPaymentTypeList()),
          catchError((error) =>
            of().pipe(tap(() => this.showErrorMessage(error)))
          )
        )
      )
    )
  );

  showErrorMessage(msg: string) {
    this.notificationService.error('Ошибка', msg);
  }

  showSuccessMessage() {
    this.notificationService.success(
      'Успешно',
      'Способ платежа создан успешно'
    );
  }

  goToPaymentTypeListPage() {
    this.router.navigate(['/app/payment-type']);
  }
}

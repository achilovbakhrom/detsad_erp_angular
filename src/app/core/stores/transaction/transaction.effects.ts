import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { merge, of } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {
  deleteTransactionById,
  deleteTransactionByIdError,
  deleteTransactionSuccess,
  fetchTransactionList,
  fetchTransactionError,
  fetchTransactionSuccess,
  saveTransaction,
  saveTransactionError,
  saveTransactionSuccess,
  setPage,
  setSize,
} from './transaction.actions';

import { tap } from 'ramda';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../types';
import { selectPage, selectSize } from './transaction.selectors';
import { selectCompany } from '../common/common.selectors';
import { TransactionService } from '../../../transaction/transaction.service';

@Injectable()
export class TransactionEffects {
  constructor(
    private actions$: Actions,
    private transactionService: TransactionService,
    private notificationService: NzNotificationService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  createTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveTransaction),

      mergeMap((action) =>
        this.transactionService
          .createTransaction({
            ...action.transaction,
          })
          .pipe(
            map((transaction) => {
              this.showSuccessMessage();
              this.goToTransactionPage();
              return saveTransactionSuccess({ transaction: transaction });
            }),

            catchError((error) =>
              of(saveTransactionError({ error })).pipe(
                tap(() => this.showErrorMessage(error))
              )
            )
          )
      )
    )
  );

  fetchTransactionList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchTransactionList),
      withLatestFrom(
        this.store.select(selectPage),
        this.store.select(selectSize),
        this.store.select(selectCompany)
      ),

      switchMap(([_, page, size, company]) =>
        this.transactionService.fetchTransactionList({ page, size }).pipe(
          map((response) => fetchTransactionSuccess(response)),
          catchError((error) =>
            of(fetchTransactionError({ error })).pipe(
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
      map(() => fetchTransactionList())
    )
  );

  deleteTransactionById = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTransactionById),
      mergeMap((action) =>
        this.transactionService.deleteTransactionById(action.id).pipe(
          mergeMap(() =>
            merge(of(fetchTransactionList()), of(deleteTransactionSuccess()))
          ),
          catchError((error) =>
            of().pipe(
              tap(() => this.showErrorMessage(error)),
              map(() => deleteTransactionByIdError())
            )
          )
        )
      )
    )
  );

  showErrorMessage(msg: string) {
    this.notificationService.error('Ошибка', msg);
  }

  showSuccessMessage() {
    this.notificationService.success('Успешно', 'Операция прошла успешно');
  }

  goToTransactionPage() {
    this.router.navigate(['/app/transaction']);
  }
}

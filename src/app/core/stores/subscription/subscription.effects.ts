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
  deleteSubscriptionById,
  deleteSubscriptionByIdError,
  deleteSubscriptionSuccess,
  fetchSubscriptionList,
  fetchSubscriptionError,
  fetchSubscriptionSuccess,
  saveSubscription,
  saveSubscriptionError,
  saveSubscriptionSuccess,
  setPage,
  setSize,
} from './subscription.actions';

import { tap } from 'ramda';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../types';
import { selectPage, selectSize } from './subscription.selectors';
import { selectCompany } from '../common/common.selectors';
import { SubscriptionService } from '../../../subscription/subscription.service';

@Injectable()
export class SubscriptionEffects {
  constructor(
    private actions$: Actions,
    private subscriptionService: SubscriptionService,
    private notificationService: NzNotificationService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  createSubscription$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveSubscription),

      mergeMap((action) =>
        this.subscriptionService
          .createSubscription({
            ...action.subscription,
          })
          .pipe(
            map((subscription) => {
              this.showSuccessMessage();
              this.goToSubscriptionPage();
              return saveSubscriptionSuccess({ subscription });
            }),

            catchError((error) =>
              of(saveSubscriptionError({ error })).pipe(
                tap(() => this.showErrorMessage(error))
              )
            )
          )
      )
    )
  );

  fetchSubscriptionList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchSubscriptionList),
      withLatestFrom(
        this.store.select(selectPage),
        this.store.select(selectSize),
        this.store.select(selectCompany)
      ),

      switchMap(([_, page, size, company]) =>
        this.subscriptionService.fetchSubscriptionList({ page, size }).pipe(
          map((response) => fetchSubscriptionSuccess(response)),
          catchError((error) =>
            of(fetchSubscriptionError({ error })).pipe(
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
      map(() => fetchSubscriptionList())
    )
  );

  deleteSubscriptionById = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteSubscriptionById),
      mergeMap((action) =>
        this.subscriptionService.deleteSubscriptionById(action.id).pipe(
          mergeMap(() =>
            merge(of(fetchSubscriptionList()), of(deleteSubscriptionSuccess()))
          ),
          catchError((error) =>
            of().pipe(
              tap(() => this.showErrorMessage(error)),
              map(() => deleteSubscriptionByIdError())
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

  goToSubscriptionPage() {
    this.router.navigate(['/app/subscription']);
  }
}

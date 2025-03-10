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
  deleteChildContractById,
  deleteChildContractByIdError,
  deleteChildContractByIdSuccess,
  fetchChildContractList,
  fetchChildContractListError,
  fetchChildContractListSuccess,
  saveChildContract,
  saveChildContractError,
  saveChildContractSuccess,
  changeStatusById,
  changeStatusByIdError,
  changeStatusByIdSuccess,
  setPage,
  setSize,
} from './child-contract.actions';

import { tap } from 'ramda';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../types';
import { selectPage, selectSize } from './child-contract.selectors';
import { selectCompany } from '../common/common.selectors';
import { ChildContractService } from '../../../child-contract/child-contract.service';

@Injectable()
export class ChildContractEffects {
  constructor(
    private actions$: Actions,
    private childContractService: ChildContractService,
    private notificationService: NzNotificationService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  createChildContractContract$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveChildContract),
      withLatestFrom(this.store.select(selectCompany)),
      mergeMap(([action, company]) =>
        this.childContractService
          .createChildContract(action.childContract)
          .pipe(
            map((childContract) => {
              this.showSuccessMessage();
              this.goToChildContractListPage();
              return saveChildContractSuccess({
                childContract,
              });
            }),

            catchError((error) =>
              of(saveChildContractError({ error })).pipe(
                tap(() => this.showErrorMessage(error))
              )
            )
          )
      )
    )
  );

  fetchChildContractList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchChildContractList),
      withLatestFrom(
        this.store.select(selectPage),
        this.store.select(selectSize),
        this.store.select(selectCompany)
      ),

      switchMap(([_, page, size, company]) =>
        this.childContractService.fetchChildContractList({ page, size }).pipe(
          map((response) => fetchChildContractListSuccess(response)),
          catchError((error) =>
            of(fetchChildContractListError({ error })).pipe(
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
      map(() => fetchChildContractList())
    )
  );

  deleteChildContractById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteChildContractById),
      mergeMap((action) =>
        this.childContractService.deleteChildContractById(action.id).pipe(
          mergeMap(() =>
            merge(
              of(fetchChildContractList()),
              of(deleteChildContractByIdSuccess())
            )
          ),
          catchError((error) =>
            of().pipe(
              tap(() => this.showErrorMessage(error)),
              map(() => deleteChildContractByIdError())
            )
          )
        )
      )
    )
  );

  changeChildContractStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(changeStatusById),
      mergeMap((action) =>
        this.childContractService
          .changeChildContractStatusById(action.id, action.status)
          .pipe(
            mergeMap(() =>
              merge(of(fetchChildContractList()), of(changeStatusByIdSuccess()))
            ),
            catchError((error) =>
              of().pipe(
                tap(() => this.showErrorMessage(error)),
                map(() => changeStatusByIdError())
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
    this.notificationService.success(
      'Успешно',
      'Группа зарегистрирована успешно'
    );
  }

  goToChildContractListPage() {
    this.router.navigate(['/app/child-contract']);
  }
}

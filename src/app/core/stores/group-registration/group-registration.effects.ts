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
  deleteGroupRegistrationById,
  deleteGroupRegistrationByIdError,
  deleteGroupRegistrationByIdSuccess,
  fetchGroupRegistrationList,
  fetchGroupRegistrationListError,
  fetchGroupRegistrationListSuccess,
  saveGroupRegistration,
  saveGroupRegistrationError,
  saveGroupRegistrationSuccess,
  changeStatusById,
  changeStatusByIdError,
  changeStatusByIdSuccess,
  setPage,
  setSize,
} from './group-registration.actions';

import { tap } from 'ramda';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../types';
import { selectPage, selectSize } from './group-registration.selectors';
import { selectCompany } from '../common/common.selectors';
import { GroupRegistrationService } from '../../../group-registration/group-registration.service';

@Injectable()
export class GroupRegistrationEffects {
  constructor(
    private actions$: Actions,
    private groupRegistrationService: GroupRegistrationService,
    private notificationService: NzNotificationService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  createGroupRegistrationContract$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveGroupRegistration),
      withLatestFrom(this.store.select(selectCompany)),
      mergeMap(([action, company]) =>
        this.groupRegistrationService
          .createGroupRegistration(action.groupRegistration)
          .pipe(
            map((groupRegistration) => {
              this.showSuccessMessage();
              this.goToGroupRegistrationListPage();
              return saveGroupRegistrationSuccess({
                groupRegistration,
              });
            }),

            catchError((error) =>
              of(saveGroupRegistrationError({ error })).pipe(
                tap(() => this.showErrorMessage(error))
              )
            )
          )
      )
    )
  );

  fetchGroupRegistrationList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchGroupRegistrationList),
      withLatestFrom(
        this.store.select(selectPage),
        this.store.select(selectSize),
        this.store.select(selectCompany)
      ),

      switchMap(([_, page, size, company]) =>
        this.groupRegistrationService
          .fetchGroupRegistrationList({ page, size, company: company?.id })
          .pipe(
            map((response) => fetchGroupRegistrationListSuccess(response)),
            catchError((error) =>
              of(fetchGroupRegistrationListError({ error })).pipe(
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
      map(() => fetchGroupRegistrationList())
    )
  );

  deleteEmployeeContractById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteGroupRegistrationById),
      mergeMap((action) =>
        this.groupRegistrationService
          .deleteGroupRegistrationById(action.id)
          .pipe(
            mergeMap(() =>
              merge(
                of(fetchGroupRegistrationList()),
                of(deleteGroupRegistrationByIdSuccess())
              )
            ),
            catchError((error) =>
              of().pipe(
                tap(() => this.showErrorMessage(error)),
                map(() => deleteGroupRegistrationByIdError())
              )
            )
          )
      )
    )
  );

  changeGroupRegistrationStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(changeStatusById),
      mergeMap((action) =>
        this.groupRegistrationService
          .changeGroupRegistrationStatusById(action.id, action.status)
          .pipe(
            mergeMap(() =>
              merge(
                of(fetchGroupRegistrationList()),
                of(changeStatusByIdSuccess())
              )
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

  goToGroupRegistrationListPage() {
    this.router.navigate(['/app/group-registration']);
  }
}

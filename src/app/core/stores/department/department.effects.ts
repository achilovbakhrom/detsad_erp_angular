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
  deleteDepartmentById,
  fetchDepartmentList,
  fetchDepartmentListError,
  fetchDepartmentListSuccess,
  saveDepartment,
  saveDepartmentFailure,
  saveDepartmentSuccess,
  setPage,
  setSize,
} from './department.actions';

import { tap } from 'ramda';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../types';
import { selectPage, selectSize } from './department.selectors';
import { selectCompany } from '../common/common.selectors';
import { DepartmentService } from '../../../department/department.service';

@Injectable()
export class DepartmentEffects {
  constructor(
    private actions$: Actions,
    private departmentService: DepartmentService,
    private notificationService: NzNotificationService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  saveDepartment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveDepartment),
      withLatestFrom(this.store.select(selectCompany)),
      mergeMap(([action, company]) =>
        this.departmentService
          .createDepartment({ ...action.department, company: company?.id })
          .pipe(
            map((department) => {
              this.showSuccessMessage();
              this.goToDepartmentListPage();
              return saveDepartmentSuccess({ department });
            }),

            catchError((error) =>
              of(saveDepartmentFailure({ error })).pipe(
                tap(() => this.showErrorMessage(error))
              )
            )
          )
      )
    )
  );

  fetchDepartmentList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchDepartmentList),
      withLatestFrom(
        this.store.select(selectPage),
        this.store.select(selectSize),
        this.store.select(selectCompany)
      ),

      switchMap(([_, page, size]) =>
        this.departmentService.fetchDepartmentList({ page, size }).pipe(
          map((response) => fetchDepartmentListSuccess(response)),
          catchError((error) =>
            of(fetchDepartmentListError({ error })).pipe(
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
      map(() => fetchDepartmentList())
    )
  );

  deleteDepartmentById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteDepartmentById),
      mergeMap((action) =>
        this.departmentService.deleteDepartmentById(action.id).pipe(
          map(() => fetchDepartmentList()),
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
    this.notificationService.success('Успешно', 'Раздел создан успешно');
  }

  goToDepartmentListPage() {
    this.router.navigate(['/app/department']);
  }
}

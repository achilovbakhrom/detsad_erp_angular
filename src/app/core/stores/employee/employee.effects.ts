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
  deleteEmployeeById,
  fetchEmployeeList,
  fetchEmployeeListError,
  fetchEmployeeListSuccess,
  saveEmployee,
  saveEmployeeFailure,
  saveEmployeeSuccess,
  setPage,
  setSize,
} from './employee.actions';

import { tap } from 'ramda';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../types';
import { selectPage, selectSize } from './employee.selectors';
import { selectCompany } from '../common/common.selectors';
import { EmployeeService } from '../../../employee/employee.service';

@Injectable()
export class EmployeeEffects {
  constructor(
    private actions$: Actions,
    private employeeService: EmployeeService,
    private notificationService: NzNotificationService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  saveEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveEmployee),
      withLatestFrom(this.store.select(selectCompany)),
      mergeMap(([action, company]) =>
        this.employeeService
          .createEmployee({ ...action.employee, company: company?.id })
          .pipe(
            map((employee) => {
              this.showSuccessMessage();
              this.goToEmployeeListPage();
              return saveEmployeeSuccess({ employee });
            }),

            catchError((error) =>
              of(saveEmployeeFailure({ error })).pipe(
                tap(() => this.showErrorMessage(error))
              )
            )
          )
      )
    )
  );

  fetchEmployeeList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchEmployeeList),
      withLatestFrom(
        this.store.select(selectPage),
        this.store.select(selectSize),
        this.store.select(selectCompany)
      ),

      switchMap(([_, page, size, company]) =>
        this.employeeService
          .fetchEmployeeList({ page, size, company: company?.id })
          .pipe(
            map((response) => fetchEmployeeListSuccess(response)),
            catchError((error) =>
              of(fetchEmployeeListError({ error })).pipe(
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
      map(() => fetchEmployeeList())
    )
  );

  deleteEmployeeById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteEmployeeById),
      mergeMap((action) =>
        this.employeeService.deleteEmployeeById(action.id).pipe(
          map(() => fetchEmployeeList()),
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
    this.notificationService.success('Успешно', 'Сотрудник создан успешно');
  }

  goToEmployeeListPage() {
    this.router.navigate(['/app/employee']);
  }
}

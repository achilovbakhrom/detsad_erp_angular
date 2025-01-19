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
  deleteEmployeeContractById,
  fetchEmployeeContractList,
  fetchEmployeeContractListError,
  fetchEmployeeContractListSuccess,
  saveEmployeeContract,
  saveEmployeeContractFailure,
  saveEmployeeContractSuccess,
  setPage,
  setSize,
} from './employee-contract.actions';

import { tap } from 'ramda';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../types';
import { selectPage, selectSize } from './employee-contract.selectors';
import { selectCompany } from '../common/common.selectors';
import { EmployeeContractService } from '../../../employee-contract/employee-contract.service';

@Injectable()
export class EmployeeContractEffects {
  constructor(
    private actions$: Actions,
    private employeeService: EmployeeContractService,
    private notificationService: NzNotificationService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  saveEmployeeContract$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveEmployeeContract),
      withLatestFrom(this.store.select(selectCompany)),
      mergeMap(([action, company]) =>
        this.employeeService
          .createEmployeeContract(action.employeeContract)
          .pipe(
            map((employee) => {
              this.showSuccessMessage();
              this.goToEmployeeContractListPage();
              return saveEmployeeContractSuccess({
                employeeContract: employee,
              });
            }),

            catchError((error) =>
              of(saveEmployeeContractFailure({ error })).pipe(
                tap(() => this.showErrorMessage(error))
              )
            )
          )
      )
    )
  );

  fetchEmployeeContractList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchEmployeeContractList),
      withLatestFrom(
        this.store.select(selectPage),
        this.store.select(selectSize),
        this.store.select(selectCompany)
      ),

      switchMap(([_, page, size, company]) =>
        this.employeeService
          .fetchEmployeeList({ page, size, company: company?.id })
          .pipe(
            map((response) => fetchEmployeeContractListSuccess(response)),
            catchError((error) =>
              of(fetchEmployeeContractListError({ error })).pipe(
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
      map(() => fetchEmployeeContractList())
    )
  );

  deleteEmployeeContractById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteEmployeeContractById),
      mergeMap((action) =>
        this.employeeService.deleteEmployeeById(action.id).pipe(
          map(() => fetchEmployeeContractList()),
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
      'Контракт сотрудника создан успешно'
    );
  }

  goToEmployeeContractListPage() {
    this.router.navigate(['/app/employee-contract']);
  }
}

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
  deleteEmployeeContractById,
  deleteEmployeeContractByIdError,
  deleteEmployeeContractByIdSuccess,
  fetchEmployeeContractList,
  fetchEmployeeContractListError,
  fetchEmployeeContractListSuccess,
  fireEmployeeByContractId,
  fireEmployeeByContractIdError,
  fireEmployeeByContractIdSuccess,
  hireEmployeeByContractId,
  hireEmployeeByContractIdError,
  hireEmployeeByContractIdSuccess,
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
    private employeeContractService: EmployeeContractService,
    private notificationService: NzNotificationService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  createEmployeeContract$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveEmployeeContract),
      withLatestFrom(this.store.select(selectCompany)),
      mergeMap(([action, company]) =>
        this.employeeContractService
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

      switchMap(([_, page, size]) =>
        this.employeeContractService
          .fetchEmployeeContractList({ page, size })
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

  fireEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fireEmployeeByContractId),
      mergeMap((action) =>
        this.employeeContractService.fireEmployeeContractById(action.id).pipe(
          tap(() =>
            this.notificationService.success(
              'Успешно',
              'Сотрудник уволен успешно!'
            )
          ),
          mergeMap(() =>
            merge(
              of(fetchEmployeeContractList()),
              of(fireEmployeeByContractIdSuccess())
            )
          ),
          catchError((error) =>
            of().pipe(
              tap(() => this.showErrorMessage(error)),
              map(() => fireEmployeeByContractIdError())
            )
          )
        )
      )
    )
  );

  deleteEmployeeContractById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteEmployeeContractById),
      mergeMap((action) =>
        this.employeeContractService.deleteEmployeeContractById(action.id).pipe(
          mergeMap(() =>
            merge(
              of(fetchEmployeeContractList()),
              of(deleteEmployeeContractByIdSuccess())
            )
          ),
          catchError((error) =>
            of().pipe(
              tap(() => this.showErrorMessage(error)),
              map(() => deleteEmployeeContractByIdError())
            )
          )
        )
      )
    )
  );

  hireEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(hireEmployeeByContractId),
      mergeMap((action) =>
        this.employeeContractService.hireEmployeeContractById(action.id).pipe(
          tap(() =>
            this.notificationService.success(
              'Успешно',
              'Сотрудник успешно принят на работу!'
            )
          ),
          mergeMap(() =>
            merge(
              of(fetchEmployeeContractList()),
              of(hireEmployeeByContractIdSuccess())
            )
          ),
          catchError((error) =>
            of().pipe(
              tap(() => this.showErrorMessage(error)),
              map(() => hireEmployeeByContractIdError())
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
      'Контракт сотрудника создан успешно'
    );
  }

  goToEmployeeContractListPage() {
    this.router.navigate(['/app/employee-contract']);
  }
}

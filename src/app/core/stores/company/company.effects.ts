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
  saveCompany,
  saveCompanySuccess,
  saveCompanyFailure,
  fetchCompanyList,
  fetchCompanyListSuccess,
  fetchCompanyListError,
  setPage,
  setSize,
  deleteCompanyById,
} from './company.actions';
import { CompanyService } from '../../../company/company.service';
import { tap } from 'ramda';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../types';
import { selectPage, selectSize } from './company.selectors';

@Injectable()
export class CompanyEffects {
  constructor(
    private actions$: Actions,
    private companyService: CompanyService,
    private notificationService: NzNotificationService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  saveCompany$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveCompany),
      mergeMap((action) =>
        this.companyService.createCompany(action.company).pipe(
          map((company) => {
            this.showSuccessMessage();
            this.goToCompanyList();
            return saveCompanySuccess({ company });
          }),

          catchError((error) =>
            of(saveCompanyFailure({ error })).pipe(
              tap(() => this.showErrorMessage(error))
            )
          )
        )
      )
    )
  );

  fetchCompanyList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchCompanyList),
      withLatestFrom(
        this.store.select(selectPage),
        this.store.select(selectSize)
      ),

      switchMap(([_, page, size]) =>
        this.companyService.fetchCompanyList({ page, size }).pipe(
          map((response) => fetchCompanyListSuccess(response)),
          catchError((error) =>
            of(fetchCompanyListError({ error })).pipe(
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
      map(() => fetchCompanyList())
    )
  );

  deleteCompanyById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteCompanyById),
      mergeMap((action) =>
        this.companyService.deleteCompanyById(action.id).pipe(
          map(() => fetchCompanyList()),
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
    this.notificationService.success('Успешно', 'Компания создана успешно');
  }

  goToCompanyList() {
    this.router.navigate(['/app/company']);
  }
}

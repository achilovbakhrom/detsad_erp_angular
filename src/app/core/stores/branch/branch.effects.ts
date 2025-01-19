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
  deleteBranchById,
  fetchBranchList,
  fetchBranchListError,
  fetchBranchListSuccess,
  saveBranch,
  saveBranchFailure,
  saveBranchSuccess,
  setPage,
  setSize,
} from './branch.actions';

import { tap } from 'ramda';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../types';
import { selectPage, selectSize } from './branch.selectors';
import { BranchService } from '../../../branch/branch.service';
import { selectCompany } from '../common/common.selectors';

@Injectable()
export class BranchEffects {
  constructor(
    private actions$: Actions,
    private branchService: BranchService,
    private notificationService: NzNotificationService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  saveBranch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveBranch),
      withLatestFrom(this.store.select(selectCompany)),
      mergeMap(([action, company]) =>
        this.branchService
          .createBranch({ ...action.branch, company: company?.id })
          .pipe(
            map((branch) => {
              this.showSuccessMessage();
              this.goToBranchListPage();
              return saveBranchSuccess({ branch });
            }),

            catchError((error) =>
              of(saveBranchFailure({ error })).pipe(
                tap(() => this.showErrorMessage(error))
              )
            )
          )
      )
    )
  );

  fetchBranchList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchBranchList),
      withLatestFrom(
        this.store.select(selectPage),
        this.store.select(selectSize),
        this.store.select(selectCompany)
      ),

      switchMap(([_, page, size, company]) =>
        this.branchService
          .fetchBranchList({ page, size, company: company?.id })
          .pipe(
            map((response) => fetchBranchListSuccess(response)),
            catchError((error) =>
              of(fetchBranchListError({ error })).pipe(
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
      map(() => fetchBranchList())
    )
  );

  deleteBranchById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteBranchById),
      mergeMap((action) =>
        this.branchService.deleteBranchById(action.id).pipe(
          map(() => fetchBranchList()),
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
    this.notificationService.success('Успешно', 'Филиал создан успешно');
  }

  goToBranchListPage() {
    this.router.navigate(['/app/branch']);
  }
}

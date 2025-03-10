import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Nillable } from '../model/nullable';
import { Company } from '../model/company';
import { Store } from '@ngrx/store';
import { AppState } from '../core/stores/types';
import { selectCompany } from '../core/stores/common/common.selectors';

@Component({
  selector: 'app-branch',
  standalone: false,
  templateUrl: './branch.component.html',
  styleUrl: './branch.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BranchComponent {
  currentCompany!: Observable<Nillable<Company>>;

  constructor(private store: Store<AppState>) {
    this.currentCompany = this.store.select(selectCompany);
  }
}

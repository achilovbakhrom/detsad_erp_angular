import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../model/company';
import { Nillable } from '../model/nullable';
import { Store } from '@ngrx/store';
import { AppState } from '../core/stores/types';
import { selectCompany } from '../core/stores/common/common.selectors';

@Component({
  selector: 'app-sick-leave',
  standalone: false,

  templateUrl: './sick-leave.component.html',
  styleUrl: './sick-leave.component.scss',
})
export class SickLeaveComponent {
  currentCompany!: Observable<Nillable<Company>>;

  constructor(private store: Store<AppState>) {
    this.currentCompany = this.store.select(selectCompany);
  }
}

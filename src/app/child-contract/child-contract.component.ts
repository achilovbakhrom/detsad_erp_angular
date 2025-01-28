import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Nillable } from '../model/nullable';
import { Company } from '../model/company';
import { AppState } from '../core/stores/types';
import { Store } from '@ngrx/store';
import { selectCompany } from '../core/stores/common/common.selectors';

@Component({
  selector: 'app-child-contract',
  standalone: false,

  templateUrl: './child-contract.component.html',
  styleUrl: './child-contract.component.scss',
})
export class ChildContractComponent {
  currentCompany!: Observable<Nillable<Company>>;

  constructor(private store: Store<AppState>) {
    this.currentCompany = this.store.select(selectCompany);
  }
}

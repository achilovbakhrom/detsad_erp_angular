import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Nillable } from '../model/nullable';
import { Company } from '../model/company';
import { Store } from '@ngrx/store';
import { AppState } from '../core/stores/types';
import { selectCompany } from '../core/stores/common/common.selectors';

@Component({
  selector: 'app-subscription',
  standalone: false,

  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.scss',
})
export class SubscriptionComponent {
  currentCompany!: Observable<Nillable<Company>>;

  constructor(private store: Store<AppState>) {
    this.currentCompany = this.store.select(selectCompany);
  }
}

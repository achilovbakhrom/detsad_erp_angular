import { Component, OnInit } from '@angular/core';
import { Company } from '../model/company';
import { Store } from '@ngrx/store';
import { AppState } from '../core/stores/types';
import { setCompany } from '../core/stores/common/common.actions';
import { Observable } from 'rxjs';
import { Nillable } from '../model/nullable';
import { selectCompany } from '../core/stores/common/common.selectors';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  company!: Observable<Nillable<Company>>;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.company = this.store.select(selectCompany);
  }

  setCompany(company: Nillable<Company>) {
    this.store.dispatch(setCompany({ company }));
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}

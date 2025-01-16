import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Company } from '../model/company';

@Component({
  selector: 'app-dashboard',
  standalone: false,

  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  selectedCompany: Company | undefined;
}

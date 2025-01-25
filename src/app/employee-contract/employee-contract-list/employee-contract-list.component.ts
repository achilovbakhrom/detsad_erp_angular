import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Nillable } from '../../model/nullable';
import { EmployeeContract } from '../../model/EmployeeContract';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/stores/types';
import {
  selectEmployeeContractList,
  selectLoading,
  selectPage,
  selectSize,
} from '../../core/stores/employee-contract/employee-contract.selectors';
import {
  deleteEmployeeContractById,
  fetchEmployeeContractList,
  fireEmployeeByContractId,
  hireEmployeeByContractId,
  setPage,
  setSize,
} from '../../core/stores/employee-contract/employee-contract.actions';

@Component({
  selector: 'app-employee-contract-list',
  standalone: false,

  templateUrl: './employee-contract-list.component.html',
  styleUrl: './employee-contract-list.component.scss',
})
export class EmployeeContractListComponent implements OnDestroy, OnInit {
  data$: Observable<Nillable<EmployeeContract[]>>;
  page$: Observable<Nillable<number>>;
  size$: Observable<Nillable<number>>;
  isLoading$: Observable<boolean>;

  tableHeight = '0';

  @ViewChild('containerEl')
  containerRef!: ElementRef;

  private resizeObserver!: ResizeObserver;

  constructor(private store: Store<AppState>) {
    this.data$ = this.store.select(selectEmployeeContractList);
    this.page$ = this.store.select(selectPage);
    this.size$ = this.store.select(selectSize);
    this.isLoading$ = this.store.select(selectLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchEmployeeContractList());
  }

  setPage(arg: number) {
    this.store.dispatch(setPage({ page: arg }));
  }

  setSize(arg: number) {
    this.store.dispatch(setSize({ size: arg }));
  }

  onDelete(arg: EmployeeContract) {
    if (arg.id) {
      this.store.dispatch(deleteEmployeeContractById({ id: arg.id }));
    }
  }

  ngAfterViewInit(): void {
    this.resizeObserver = new ResizeObserver(() => {
      this.tableHeight = `${
        this.containerRef.nativeElement.offsetHeight - 170
      }px`;
    });

    this.resizeObserver.observe(this.containerRef.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  onHire(arg: EmployeeContract) {
    if (arg.id) {
      this.store.dispatch(hireEmployeeByContractId({ id: arg.id }));
    }
  }

  onFire(arg: EmployeeContract) {
    if (arg.id) {
      this.store.dispatch(fireEmployeeByContractId({ id: arg.id }));
    }
  }
}

import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
  Self,
  SimpleChanges,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgModel,
} from '@angular/forms';
import { Nillable } from '../../../model/nullable';
import { Group } from '../../../model/Group';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  of,
  Subject,
  switchMap,
} from 'rxjs';
import { GroupService } from '../../../group/group.service';
import { AppState } from '../../../core/stores/types';
import { Store } from '@ngrx/store';
import { selectCompany } from '../../../core/stores/common/common.selectors';
import { Company } from '../../../model/company';

@Component({
  selector: 'app-group-picker',
  standalone: false,

  templateUrl: './group-picker.component.html',
  styleUrl: './group-picker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GroupPickerComponent),
      multi: true,
    },
  ],
})
export class GroupPickerComponent
  implements OnInit, OnChanges, ControlValueAccessor
{
  @Input() selectedGroup: Nillable<Group>;

  @Output() selectedGroupChange = new EventEmitter<Group | undefined>();

  options: Group[] = [];
  loading = false;
  inputValue: string = '';
  private searchSubject = new Subject<string>();
  private currentCompany: Observable<Nillable<Company>>;

  private _onChange: (value: any) => void = () => {};
  private _onTouched: () => void = () => {};

  constructor(
    private groupService: GroupService,
    @Optional() @Self() public ngModel: NgModel,
    private store: Store<AppState>
  ) {
    this.currentCompany = this.store.select(selectCompany);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedGroup'] && changes['selectedGroup'].currentValue) {
      const group = changes['selectedGroup'].currentValue;
      this.inputValue = this.getGroupName(group);
    }
  }

  protected getGroupName(arg: Group): string {
    return arg.name;
  }

  ngOnInit(): void {
    this.searchSubject
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((value) => combineLatest([this.currentCompany, of(value)])),
        switchMap(([company, value]) => {
          return this.groupService.fetchGroupList({
            page: 1,
            size: 50,
            search: value,
          });
        }),
        map((response) => response.results)
      )
      .subscribe((groupList) => {
        this.options = groupList;
      });

    if (this.ngModel) {
      this.ngModel.valueChanges?.subscribe((value) => {
        this.inputValue = value?.name || '';
        this._onChange(value);
      });
    }

    this.searchSubject.next('');
  }

  onChange(value: string): void {
    this.searchSubject.next(value);

    if (this.inputValue !== value) {
      this.selectedGroupChange.emit(undefined);
    }
  }

  onPick(group: Group): void {
    this.inputValue = this.getGroupName(group);
    this.selectedGroupChange.emit(group);
    this._onChange(group);
  }

  clearSelection(): void {
    this.inputValue = '';
    this.selectedGroupChange.emit(undefined);
    this._onChange(undefined);
    this.searchSubject.next('');
  }

  // ControlValueAccessor methods
  writeValue(value: any): void {
    if (value) {
      this.inputValue = this.getGroupName(value);
      this.selectedGroup = value;
    } else {
      this.inputValue = '';
      this.selectedGroup = undefined;
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  // Add this method to handle the blur event and mark the control as touched
  onBlur(): void {
    this._onTouched();
  }
}

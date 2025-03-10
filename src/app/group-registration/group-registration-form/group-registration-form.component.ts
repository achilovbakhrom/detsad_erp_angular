import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppState } from '../../core/stores/types';
import { Store } from '@ngrx/store';
import {
  saveGroupRegistration,
  updateGroupRegistration,
} from '../../core/stores/group-registration/group-registration.actions';
import { ActivatedRoute } from '@angular/router';
import { Nillable } from '../../model/nullable';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Subscription } from 'rxjs';
import { GroupRegistration } from '../../model/GroupRegistration';
import { ChildContract } from '../../model/ChildContract';
import { ChildContractService } from '../../child-contract/child-contract.service';

@Component({
  selector: 'app-group-registration-form',
  standalone: false,

  templateUrl: './group-registration-form.component.html',
  styleUrl: './group-registration-form.component.scss',
})
export class GroupRegistrationFormComponent implements OnInit, OnDestroy {
  groupRegistrationForm!: FormGroup;
  id?: Nillable<string>;
  subscriptions: Subscription[] = [];
  showAdd = false;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private activeRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private childContractsService: ChildContractService
  ) {}

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.paramMap.get('id');

    this.groupRegistrationForm = this.fb.group({
      date: ['', [Validators.required]],
      group: [null, [Validators.required]],
      branch: [null, [Validators.required]],
      children: [[]],
    });

    if (this.isEditMode()) {
      const subscription = forkJoin({
        groupRegistration: this.httpClient.get<GroupRegistration>(
          `group-registration/${this.id}/`
        ),
        childContracts:
          this.childContractsService.fetchChildContractListByParent({
            page: 1,
            size: 100000,
            group_registration_id: Number(this.id!),
          }),
      }).subscribe(({ groupRegistration, childContracts }) => {
        this.groupRegistrationForm.patchValue({
          date: groupRegistration.date,
          group: groupRegistration.group,
          branch: groupRegistration.branch,
          children: childContracts.results,
        });
      });

      this.subscriptions.push(subscription);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  isEditMode() {
    return this.id != null;
  }

  onAdd() {
    this.showAdd = true;
  }

  onClose() {
    this.showAdd = false;
  }

  onSelect(child: ChildContract) {
    this.groupRegistrationForm.patchValue({
      children: [...this.groupRegistrationForm.value.children, child],
    });
    this.onClose();
  }

  onDeleteChild(child: ChildContract) {
    this.groupRegistrationForm.patchValue({
      children: this.groupRegistrationForm.value.children.filter(
        (item: ChildContract) => item.id !== child.id
      ),
    });
  }

  getChildContractName(child: ChildContract) {
    return [
      child.child.last_name,
      child.child.first_name,
      child.child.middle_name,
    ]
      .filter(Boolean)
      .join(' ');
  }

  onSubmit() {
    if (this.groupRegistrationForm.valid) {
      const groupRegistrationData = this.groupRegistrationForm.value;

      if (this.isEditMode()) {
        this.store.dispatch(
          updateGroupRegistration({
            id: Number(this.id!),
            groupRegistration: {
              date: groupRegistrationData.date,
              group: groupRegistrationData.group.id,
              branch: groupRegistrationData.branch.id,
              children: groupRegistrationData.children,
            },
          })
        );
      } else {
        this.store.dispatch(
          saveGroupRegistration({
            groupRegistration: {
              date: groupRegistrationData.date,
              group: groupRegistrationData.group.id,
              branch: groupRegistrationData.branch.id,
              children: groupRegistrationData.children,
            },
          })
        );
      }
    }
  }
}

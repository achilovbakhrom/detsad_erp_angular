import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/stores/types';
import { saveGroup } from '../../core/stores/group/group.actions';

@Component({
  selector: 'app-group-form',
  standalone: false,

  templateUrl: './group-form.component.html',
  styleUrl: './group-form.component.scss',
})
export class GroupFormComponent implements OnInit {
  groupForm!: FormGroup;
  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.groupForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: [''],
    });
  }

  onSubmit() {
    if (this.groupForm.valid) {
      const groupData = this.groupForm.value;
      this.store.dispatch(saveGroup({ group: groupData }));
    }
  }
}

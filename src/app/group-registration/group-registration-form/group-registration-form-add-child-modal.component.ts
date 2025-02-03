import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChildContract } from '../../model/ChildContract';

@Component({
  selector: 'app-group-registration-form-add-child-modal',
  standalone: false,
  templateUrl: './group-registration-form-add-child-modal.component.html',
  styleUrl: './group-registration-form-add-child-modal.component.scss',
})
export class GroupRegistrationFormComponentAddChildModal {
  @Input() visible = false;
  @Output() onClose = new EventEmitter();
  @Output() onSelect = new EventEmitter<ChildContract>();

  selectedChild?: ChildContract;

  handleCancel() {
    this.onClose.emit();
  }

  handleOk() {
    if (this.selectedChild) {
      this.onSelect.emit(this.selectedChild);
    }
  }
}

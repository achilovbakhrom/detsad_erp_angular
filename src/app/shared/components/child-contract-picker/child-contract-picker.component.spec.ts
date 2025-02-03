import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildContractPickerComponent } from './child-contract-picker.component';

describe('ChildPickerComponent', () => {
  let component: ChildContractPickerComponent;
  let fixture: ComponentFixture<ChildContractPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChildContractPickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChildContractPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

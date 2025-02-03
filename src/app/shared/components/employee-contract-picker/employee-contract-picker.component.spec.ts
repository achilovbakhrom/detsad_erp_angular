import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeContractPickerComponent } from './employee-contract-picker.component';

describe('EmployeeContractPickerComponent', () => {
  let component: EmployeeContractPickerComponent;
  let fixture: ComponentFixture<EmployeeContractPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeContractPickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeContractPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

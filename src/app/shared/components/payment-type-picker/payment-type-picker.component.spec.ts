import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentTypePickerComponent } from './payment-type-picker.component';

describe('PaymentTypePickerComponent', () => {
  let component: PaymentTypePickerComponent;
  let fixture: ComponentFixture<PaymentTypePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentTypePickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentTypePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

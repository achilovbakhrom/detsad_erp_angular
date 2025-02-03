import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasonPickerComponent } from './reason-picker.component';

describe('ReasonPickerComponent', () => {
  let component: ReasonPickerComponent;
  let fixture: ComponentFixture<ReasonPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReasonPickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReasonPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionPickerComponent } from './position-picker.component';

describe('PositionPickerComponent', () => {
  let component: PositionPickerComponent;
  let fixture: ComponentFixture<PositionPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PositionPickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PositionPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

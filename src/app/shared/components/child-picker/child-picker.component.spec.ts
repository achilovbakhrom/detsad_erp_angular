import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildPickerComponent } from './child-picker.component';

describe('ChildPickerComponent', () => {
  let component: ChildPickerComponent;
  let fixture: ComponentFixture<ChildPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChildPickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

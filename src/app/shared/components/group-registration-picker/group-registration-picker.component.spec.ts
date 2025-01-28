import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupRegistrationPickerComponent } from './group-registration-picker.component';

describe('GroupRegistrationPickerComponent', () => {
  let component: GroupRegistrationPickerComponent;
  let fixture: ComponentFixture<GroupRegistrationPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupRegistrationPickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupRegistrationPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

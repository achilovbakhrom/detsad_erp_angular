import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupRegistrationFormComponent } from './group-registration-form.component';

describe('GroupRegistrationFormComponent', () => {
  let component: GroupRegistrationFormComponent;
  let fixture: ComponentFixture<GroupRegistrationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupRegistrationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

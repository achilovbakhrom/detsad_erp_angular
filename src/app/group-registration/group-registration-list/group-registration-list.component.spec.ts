import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupRegistrationListComponent } from './group-registration-list.component';

describe('GroupRegistrationListComponent', () => {
  let component: GroupRegistrationListComponent;
  let fixture: ComponentFixture<GroupRegistrationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupRegistrationListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupRegistrationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

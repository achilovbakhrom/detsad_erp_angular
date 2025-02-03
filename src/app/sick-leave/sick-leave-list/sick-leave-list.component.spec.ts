import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SickLeaveListComponent } from './sick-leave-list.component';

describe('SickLeaveListComponent', () => {
  let component: SickLeaveListComponent;
  let fixture: ComponentFixture<SickLeaveListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SickLeaveListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SickLeaveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

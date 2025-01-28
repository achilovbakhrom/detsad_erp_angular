import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildContractFormComponent } from './child-contract-form.component';

describe('ChildContractFormComponent', () => {
  let component: ChildContractFormComponent;
  let fixture: ComponentFixture<ChildContractFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChildContractFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildContractFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

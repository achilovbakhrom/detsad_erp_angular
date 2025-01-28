import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildContractComponent } from './child-contract.component';

describe('ChildContractComponent', () => {
  let component: ChildContractComponent;
  let fixture: ComponentFixture<ChildContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChildContractComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

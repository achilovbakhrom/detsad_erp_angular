import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildContractListComponent } from './child-contract-list.component';

describe('ChildContractListComponent', () => {
  let component: ChildContractListComponent;
  let fixture: ComponentFixture<ChildContractListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChildContractListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildContractListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

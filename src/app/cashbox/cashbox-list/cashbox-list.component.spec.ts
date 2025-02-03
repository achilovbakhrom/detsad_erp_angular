import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashboxListComponent } from './cashbox-list.component';

describe('CashboxListComponent', () => {
  let component: CashboxListComponent;
  let fixture: ComponentFixture<CashboxListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CashboxListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashboxListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashboxFormComponent } from './cashbox-form.component';

describe('CashboxFormComponent', () => {
  let component: CashboxFormComponent;
  let fixture: ComponentFixture<CashboxFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CashboxFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashboxFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

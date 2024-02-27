import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonetaryTransactionFormComponent } from './monetary-transaction-form.component';

describe('MonetaryTransactionFormComponent', () => {
  let component: MonetaryTransactionFormComponent;
  let fixture: ComponentFixture<MonetaryTransactionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonetaryTransactionFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonetaryTransactionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

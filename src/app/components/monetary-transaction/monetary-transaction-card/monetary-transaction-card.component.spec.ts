import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonetaryTransactionCardComponent } from './monetary-transaction-card.component';

describe('MonetaryTransactionCardComponent', () => {
  let component: MonetaryTransactionCardComponent;
  let fixture: ComponentFixture<MonetaryTransactionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonetaryTransactionCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonetaryTransactionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

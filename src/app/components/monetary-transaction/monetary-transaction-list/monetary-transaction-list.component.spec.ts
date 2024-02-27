import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonetaryTransactionListComponent } from './monetary-transaction-list.component';

describe('MonetaryTransactionListComponent', () => {
  let component: MonetaryTransactionListComponent;
  let fixture: ComponentFixture<MonetaryTransactionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonetaryTransactionListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonetaryTransactionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

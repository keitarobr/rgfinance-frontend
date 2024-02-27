import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonetaryTransactionRegisterComponent } from './monetary-transaction-register.component';

describe('MonetaryTransactionRegisterComponent', () => {
  let component: MonetaryTransactionRegisterComponent;
  let fixture: ComponentFixture<MonetaryTransactionRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonetaryTransactionRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonetaryTransactionRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

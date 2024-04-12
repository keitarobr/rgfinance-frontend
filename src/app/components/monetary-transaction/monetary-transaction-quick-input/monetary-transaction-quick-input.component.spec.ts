import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { MonetaryTransactionQuickInputComponent } from './monetary-transaction-quick-input.component';

describe('MonetaryTransactionQuickInputComponent', () => {
  let component: MonetaryTransactionQuickInputComponent;
  let fixture: ComponentFixture<MonetaryTransactionQuickInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonetaryTransactionQuickInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonetaryTransactionQuickInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

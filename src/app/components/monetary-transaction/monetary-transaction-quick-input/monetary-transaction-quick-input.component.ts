import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Button, ButtonModule } from 'primeng/button';
import { MonetaryTransaction, MonetaryTransactionApiService } from '../../../api/monetary-transaction/monetary-transaction-api.service';
import { DatePipe, NgIf } from '@angular/common';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-monetary-transaction-quick-input',
  standalone: true,
  imports: [ButtonModule, NgIf, ReactiveFormsModule, TableModule, DatePipe],
  templateUrl: './monetary-transaction-quick-input.component.html',
  styleUrl: './monetary-transaction-quick-input.component.scss'
})
export class MonetaryTransactionQuickInputComponent {
delete(toDelete: any) {
this.monetaryTransactions.splice(this.monetaryTransactions.indexOf(toDelete), 1);
}
  
  monetaryTransactions: MonetaryTransaction[] = [];

  addTransactions() {    
    this.monetaryAPI.parse(this.formGroup.get('transactions')!.value.split("\n")).subscribe(
      transactions => {this.monetaryTransactions = transactions}
    )
  }
  formGroup: FormGroup;

  constructor(private monetaryAPI: MonetaryTransactionApiService, private messageService: MessageService) {
    this.formGroup = new FormGroup({
      transactions: new FormControl("", { nonNullable: true })
    });
  }

}

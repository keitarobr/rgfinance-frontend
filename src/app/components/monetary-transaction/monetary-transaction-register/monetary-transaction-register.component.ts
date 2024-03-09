import { Component, OnInit } from '@angular/core';
import { AccountDropdownComponent } from '../../account/account-dropdown/account-dropdown.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Account } from '../../../api/account/account-api.service';
import { MonetaryTransactionListComponent } from '../monetary-transaction-list/monetary-transaction-list.component';
import { ButtonModule } from 'primeng/button';
import { MonetaryTransaction, MonetaryTransactionApiService } from '../../../api/monetary-transaction/monetary-transaction-api.service';
import { NgIf } from '@angular/common';
import { MonetaryTransactionFormComponent } from '../monetary-transaction-form/monetary-transaction-form.component';
import { MessageService } from 'primeng/api';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-monetary-transaction-register',
  standalone: true,
  imports: [AccountDropdownComponent, ReactiveFormsModule, MonetaryTransactionListComponent, ButtonModule, NgIf, MonetaryTransactionFormComponent],
  templateUrl: './monetary-transaction-register.component.html',
  styleUrl: './monetary-transaction-register.component.scss'
})
export class MonetaryTransactionRegisterComponent {


  cancelEdit() {
this.selectedTransaction = undefined;
}

saveTransaction(_monetaryTransaction: MonetaryTransaction) {
  this.monetaryAPI.save(_monetaryTransaction).pipe(catchError(err => {
    this.messageService.add({ life: 3000, severity: 'error', summary: 'Error saving transaction', detail: err.error.message });
    return of(null);
  })).subscribe((result) => { if (result) { this.reloadTransactions(); this.selectedAccount = undefined; }});
}
  reloadTransactions() {
    throw new Error('Method not implemented.');
  }
  
  formFilter: FormGroup;
  selectedAccount?: Account;
  selectedTransaction?: MonetaryTransaction;
  selectedTransactionToDelete?: MonetaryTransaction;

  constructor(private monetaryAPI: MonetaryTransactionApiService, private messageService: MessageService) {
    this.formFilter = new FormGroup({
      account: new FormControl(null, { nonNullable: true })
    });
    this.formFilter.get("account")?.valueChanges.subscribe((newValue: Account) => { this.selectedAccount = newValue});
  }

  newTransaction() {
    this.selectedTransaction = {id: 0, value: 0.0, date: new Date(Date.now()), account: this.selectedAccount!};
  }

  

  

}

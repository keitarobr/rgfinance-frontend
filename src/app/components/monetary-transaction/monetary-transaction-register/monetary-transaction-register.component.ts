import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AccountDropdownComponent } from '../../account/account-dropdown/account-dropdown.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Account } from '../../../api/account/account-api.service';
import { MonetaryTransactionListComponent } from '../monetary-transaction-list/monetary-transaction-list.component';
import { Button, ButtonModule } from 'primeng/button';
import { MonetaryTransaction, MonetaryTransactionApiService } from '../../../api/monetary-transaction/monetary-transaction-api.service';
import { NgIf } from '@angular/common';
import { MonetaryTransactionFormComponent } from '../monetary-transaction-form/monetary-transaction-form.component';
import { MessageService } from 'primeng/api';
import { catchError, of } from 'rxjs';
import { MonetaryTransactionCardComponent } from '../monetary-transaction-card/monetary-transaction-card.component';
import { setAlternateWeakRefImpl } from '@angular/core/primitives/signals';
import { MonetaryTransactionQuickInputComponent } from "../monetary-transaction-quick-input/monetary-transaction-quick-input.component";

@Component({
    selector: 'app-monetary-transaction-register',
    standalone: true,
    templateUrl: './monetary-transaction-register.component.html',
    styleUrl: './monetary-transaction-register.component.scss',
    imports: [MonetaryTransactionQuickInputComponent, MonetaryTransactionCardComponent, AccountDropdownComponent, ReactiveFormsModule, MonetaryTransactionListComponent, ButtonModule, NgIf, MonetaryTransactionFormComponent, MonetaryTransactionQuickInputComponent]
})
export class MonetaryTransactionRegisterComponent {

@ViewChild("newButton") newButton: ElementRef | undefined;

selectTransaction(transaction: MonetaryTransaction) {
this.selectedTransaction = transaction;

}
deleteTransaction(transaction : MonetaryTransaction) {
this.monetaryAPI.delete(transaction).pipe(catchError(err => {
  this.messageService.add({ life: 3000, severity: 'error', summary: 'Error deleting transaction', detail: err.error.message });
  return of(null);
})).subscribe((result) => { if (result) { 
  
  this.messageService.add({ life: 3000, severity: 'success', summary: 'Transaction deleted'});
  this.reloadTransactions(); this.selectedTransactionToDelete = undefined; }});
}
cancelDelete() {
this.selectedTransactionToDelete = undefined;
}
deleteTransactionSelected(transaction: MonetaryTransaction) {
  this.selectedTransactionToDelete = transaction;
}


  cancelEdit() {
this.selectedTransaction = undefined;
}

saveTransaction(_monetaryTransaction: MonetaryTransaction) {
  this.monetaryAPI.save(_monetaryTransaction).pipe(catchError(err => {
    this.messageService.add({ life: 3000, severity: 'error', summary: 'Error saving transaction', detail: err.error.message });
    return of(null);
  })).subscribe((result) => { if (result) { 
    
    this.messageService.add({ life: 3000, severity: 'success', summary: 'Transaction saved'});
    this.reloadTransactions(); this.selectedTransaction = undefined; }});
}

monetaryTransactions: MonetaryTransaction[] = [];

reloadTransactions() {
  if (! this.selectedAccount) {
    this.monetaryTransactions = [];
  } else {
  this.monetaryAPI.listAllForAccount(this.selectedAccount.id).subscribe((transactionList: MonetaryTransaction[]) => {
    this.monetaryTransactions = transactionList;
    setTimeout(() => {    this.focusTransactions() }, 200);
  });
}
}
  focusTransactions() {
    this.newButton!.nativeElement.focus();
  }
  
  formFilter: FormGroup;
  selectedAccount?: Account;
  selectedTransaction?: MonetaryTransaction;
  selectedTransactionToDelete?: MonetaryTransaction;

  constructor(private monetaryAPI: MonetaryTransactionApiService, private messageService: MessageService) {
    this.formFilter = new FormGroup({
      account: new FormControl(null, { nonNullable: true })
    });
    this.formFilter.get("account")?.valueChanges.subscribe((newValue: Account) => { this.selectedAccount = newValue;
    this.reloadTransactions();});
  }

  newTransaction() {
    this.selectedTransaction = {id: 0, value: 0.0, date: new Date(Date.now()), account: this.selectedAccount!};
  }

  

  

}

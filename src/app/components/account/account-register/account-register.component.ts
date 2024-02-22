import { Component, HostListener } from '@angular/core';
import lodash from 'lodash';
import { MessageService } from 'primeng/api';
import { catchError, of } from 'rxjs';
import { Account, AccountAPIService } from '../../../api/account/account-api.service';
import { AccountListComponent } from "../account-list/account-list.component";
import { AccountFormComponent } from "../account-form/account-form.component";
import { AccountCardComponent } from "../account-card/account-card.component";
import { ButtonModule } from 'primeng/button';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-account-register',
    standalone: true,
    templateUrl: './account-register.component.html',
    styleUrl: './account-register.component.scss',
    imports: [AccountListComponent, AccountFormComponent, AccountCardComponent, ButtonModule, NgIf]
})
export class AccountRegisterComponent {

  @HostListener("window:keydown.insert", ['$event'])
  newAccount() {
    if (!this.selectedAccount && ! this.selectedAccountToDelete) {
      this.selectedAccount = {} as Account;    
    }
  }
  chooseAccountDelete(account: Account) {
    this.selectedAccountToDelete = account;
  }
  deleteAccount(account: Account) {
    this.api.delete(account).pipe(catchError(err => {
      this.messageService.add({ life: 3000, severity: 'error', summary: 'Error removing account', detail: err.error.message });
      return of(null);
    })).subscribe((result) => { if (result) { this.reloadCategories(); this.selectedAccountToDelete = undefined; } });
  }
  cancelDelete() {
    this.selectedAccountToDelete = undefined;
  }

  accounts: Account[] = [];

  saveAccount(account: Account) {
    this.api.save(account).pipe(catchError(err => {
      this.messageService.add({ life: 3000, severity: 'error', summary: 'Error removing account', detail: err.error.message });
      return of(null);
    })).subscribe((result) => { if (result) { this.reloadCategories(); this.selectedAccount = undefined; }});
  }

  cancelEdit() {
    this.selectedAccount = undefined;
  }

  selectedAccount?: Account;
  selectedAccountToDelete?: Account;

  chooseAccount(account: Account) {
    this.selectedAccount = lodash.cloneDeep(account);
  }

  constructor(private api: AccountAPIService, private messageService: MessageService) {
    this.api = api;
    this.reloadCategories();
  }

  private reloadCategories() {
    this.api.listAll().subscribe(accounts => this.accounts = accounts);
  }

}



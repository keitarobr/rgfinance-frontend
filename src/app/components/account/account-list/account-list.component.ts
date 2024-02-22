import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Account } from '../../../api/account/account-api.service';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-account-list',
  standalone: true,
  imports: [TableModule, PanelModule, ButtonModule, NgIf],
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.scss'
})
export class AccountListComponent {

  rowAccount?: Account;

  @Input() navigationEnabled: boolean = true;
  @Input() accounts: Account[] = [];
  @Output() onSelected: EventEmitter<Account> = new EventEmitter();
  @Output() onDeleted: EventEmitter<Account> = new EventEmitter();

  @HostListener("window:keydown.e", ['$event'])
  editKey(event: any) {
    if (! this.navigationEnabled) {
      return;
    }
    event.preventDefault();
    if (event && this.rowAccount) {
      this.edit(this.rowAccount);
    }
  }

  edit(account: Account) {
    this.onSelected.emit(account);
  }

  @HostListener("window:keydown.Delete", ['$event'])
  deleteKey(event: any) {
    if (! this.navigationEnabled) {
      return;
    }
    event.preventDefault();
    if (event && this.rowAccount) {
      this.delete(this.rowAccount);
    }
  }

  delete(account: Account) {
    this.onDeleted.emit(account);
  }

  @HostListener("window:keydown.ArrowDown", ['$event'])
  keyDown() {
    if (! this.navigationEnabled) {
      return;
    }
    if (this.rowAccount && ! this.accounts.includes(this.rowAccount)) {
      this.rowAccount = undefined;
    }
    
    if (! this.rowAccount && this.accounts.length > 0) {
      this.rowAccount = this.accounts[0];
    } else if (this.rowAccount) {
      const idx = this.accounts.indexOf(this.rowAccount);
      if (idx < (this.accounts.length - 1)) {
        this.rowAccount = this.accounts[idx + 1];
      }
    }
  }

  @HostListener("window:keydown.ArrowUp", ['$event'])
  keyUp() {
    if (! this.navigationEnabled) {
      return;
    }
    if (this.rowAccount && ! this.accounts.includes(this.rowAccount)) {
      this.rowAccount = undefined;
    }
    
    if (! this.rowAccount && this.accounts.length > 0) {
      this.rowAccount = this.accounts[0];
    } else if (this.rowAccount) {
      const idx = this.accounts.indexOf(this.rowAccount);
      if (idx > 0) {
        this.rowAccount = this.accounts[idx - 1];
      }
    }
  }

}

import { NgIf } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { MonetaryTransaction, MonetaryTransactionApiService } from '../../../api/monetary-transaction/monetary-transaction-api.service';
import { Account } from '../../../api/account/account-api.service';

@Component({
  selector: 'app-monetary-transaction-list',
  standalone: true,
  imports: [TableModule, PanelModule, ButtonModule, NgIf],
  templateUrl: './monetary-transaction-list.component.html',
  styleUrl: './monetary-transaction-list.component.scss'
})
export class MonetaryTransactionListComponent {

  @Input() navigationEnabled: boolean = true;
  @Input() monetaryTransactions: MonetaryTransaction[] = [];
  @Output() onSelected: EventEmitter<MonetaryTransaction> = new EventEmitter();
  @Output() onDeleted: EventEmitter<MonetaryTransaction> = new EventEmitter();
  

  constructor() {
    
  }

 
  delete(monetaryTransaction: MonetaryTransaction) {
    this.onDeleted.emit(monetaryTransaction);  
  }

  edit(monetaryTransaction: MonetaryTransaction) {
  this.onSelected.emit(monetaryTransaction);
  }

  rowMonetaryTransaction?: MonetaryTransaction;

  @HostListener("window:keydown.ArrowDown", ['$event'])
  keyDown() {
    if (! this.navigationEnabled) {
      return;
    }
    if (this.rowMonetaryTransaction && ! this.monetaryTransactions.includes(this.rowMonetaryTransaction)) {
      this.rowMonetaryTransaction = undefined;
    }
    
    if (! this.rowMonetaryTransaction && this.monetaryTransactions.length > 0) {
      this.rowMonetaryTransaction = this.monetaryTransactions[0];
    } else if (this.rowMonetaryTransaction) {
      const idx = this.monetaryTransactions.indexOf(this.rowMonetaryTransaction);
      if (idx < (this.monetaryTransactions.length - 1)) {
        this.rowMonetaryTransaction = this.monetaryTransactions[idx + 1];
      }
    }
  }

  @HostListener("window:keydown.ArrowUp", ['$event'])
  keyUp() {
    if (! this.navigationEnabled) {
      return;
    }
    if (this.rowMonetaryTransaction && ! this.monetaryTransactions.includes(this.rowMonetaryTransaction)) {
      this.rowMonetaryTransaction = undefined;
    }
    
    if (! this.rowMonetaryTransaction && this.monetaryTransactions.length > 0) {
      this.rowMonetaryTransaction = this.monetaryTransactions[0];
    } else if (this.rowMonetaryTransaction) {
      const idx = this.monetaryTransactions.indexOf(this.rowMonetaryTransaction);
      if (idx > 0) {
        this.rowMonetaryTransaction = this.monetaryTransactions[idx - 1];
      }
    }
  }

  @HostListener("window:keydown.Delete", ['$event'])
  deleteKey(event: any) {
    if (! this.navigationEnabled) {
      return;
    }
    event.preventDefault();
    if (event && this.rowMonetaryTransaction) {
      this.delete(this.rowMonetaryTransaction);
    }
  }

  @HostListener("window:keydown.e", ['$event'])
  editKey(event: any) {
    if (! this.navigationEnabled) {
      return;
    }
    event.preventDefault();
    if (event && this.rowMonetaryTransaction) {
      this.edit(this.rowMonetaryTransaction);
    }
  }

 
}


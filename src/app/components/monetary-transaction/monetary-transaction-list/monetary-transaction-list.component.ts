import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
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
  
  private _account: Account;

  constructor(private monetaryTransactionAPI: MonetaryTransactionApiService) {
    
  }

  @Input()
  public set account(value: Account) {
    this._account = value;
    this.monetaryTransactionAPI.listAll().subscribe((transactionList: MonetaryTransaction[]) => {
      this.monetaryTransactions = transactionList.filter(t => t.)
    });
  }

  delete(_t13: any) {
  throw new Error('Method not implemented.');
  }
  edit(_t13: any) {
  throw new Error('Method not implemented.');
  }

  monetaryTransactions: MonetaryTransaction[] = [];
  rowMonetaryTransaction?: MonetaryTransaction;

}

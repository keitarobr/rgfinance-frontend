import { Component, OnInit } from '@angular/core';
import { AccountDropdownComponent } from '../../account/account-dropdown/account-dropdown.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Account } from '../../../api/account/account-api.service';

@Component({
  selector: 'app-monetary-transaction-register',
  standalone: true,
  imports: [AccountDropdownComponent, ReactiveFormsModule],
  templateUrl: './monetary-transaction-register.component.html',
  styleUrl: './monetary-transaction-register.component.scss'
})
export class MonetaryTransactionRegisterComponent {
  
  formFilter: FormGroup;
  selectedAccount?: Account;

  constructor() {
    this.formFilter = new FormGroup({
      account: new FormControl(null, { nonNullable: true })
    });
    this.formFilter.get("account")?.valueChanges.subscribe((newValue: Account) => {console.log("a"); this.selectedAccount = newValue});
  }

  

  

}

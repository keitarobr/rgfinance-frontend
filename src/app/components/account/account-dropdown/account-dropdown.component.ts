import { Component, forwardRef } from '@angular/core';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { Account, AccountAPIService } from '../../../api/account/account-api.service';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-account-dropdown',
  standalone: true,
  imports: [DropdownModule, FormsModule],
  templateUrl: './account-dropdown.component.html',
  styleUrl: './account-dropdown.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AccountDropdownComponent),
      multi: true,
    },
  ]
})
export class AccountDropdownComponent implements ControlValueAccessor {

  onChange: any = () => {}
  disabled: boolean = false;

  constructor(accountsAPI: AccountAPIService) {
    accountsAPI.listAll().subscribe(accountsList => this.accounts = accountsList);
  }

  valueSelected(event: DropdownChangeEvent) {
    this.selectedAccount = event.value;
    this.onChange(event.value);
  }

  writeValue(obj: Account): void {
    this.selectedAccount = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    // Do nothing
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  accounts: Account[] = [];
  selectedAccount? : Account;

}

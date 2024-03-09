import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumber, InputNumberModule } from 'primeng/inputnumber';
import { PanelModule } from 'primeng/panel';
import { MonetaryTransaction } from '../../../api/monetary-transaction/monetary-transaction-api.service';
import { CategoryDropdownComponent } from '../../category/category-dropdown/category-dropdown.component';
import { Category } from '../../../api/category/category-api.service';

@Component({
  selector: 'app-monetary-transaction-form',
  standalone: true,
  imports: [CalendarModule, FormsModule, ReactiveFormsModule, PanelModule, InputGroupModule, InputGroupAddonModule, InputNumberModule,
  CategoryDropdownComponent],
  templateUrl: './monetary-transaction-form.component.html',
  styleUrl: './monetary-transaction-form.component.scss'
})
export class MonetaryTransactionFormComponent {

  @HostListener("window:keydown.escape", ['$event'])
  cancel() {
    this.onCancel.emit(this._monetaryTransaction);
  }

  @HostListener("window:keydown.Enter", ['$event'])
  saveKey(event: any) {
    event.preventDefault();
    this.save();
  }

  save() {
    if (!this.form.invalid) {      
      this.onSave.emit(this._monetaryTransaction);
    }
  }

  private _monetaryTransaction: MonetaryTransaction = <MonetaryTransaction>{};

  @Input() set monetaryTransaction(value: MonetaryTransaction | undefined) {
    if (value == null) {
      this._monetaryTransaction = <MonetaryTransaction>{};
    } else {
      this._monetaryTransaction = value;
    }
    this.form.get("date")!.setValue(this._monetaryTransaction.date);
    this.form.get("value")!.setValue(this._monetaryTransaction.value);
    this.form.get("category")!.setValue(this._monetaryTransaction.category);
  }

  @Output() onSave: EventEmitter<MonetaryTransaction> = new EventEmitter();
  @Output() onCancel: EventEmitter<MonetaryTransaction> = new EventEmitter();



  form = new FormGroup({
    date: new FormControl(new Date(Date.now()), { nonNullable: true }),
    value: new FormControl(0.0, { nonNullable: true }),
    category: new FormControl({} as Category|undefined, { nonNullable: true }),
  });


}

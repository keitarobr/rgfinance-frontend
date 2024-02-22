import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { Account } from '../../../api/account/account-api.service';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-account-form',
  standalone: true,
  imports: [PanelModule, InputTextModule, InputGroupModule, InputGroupAddonModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.scss'
})
export class AccountFormComponent {
  
  @ViewChild('name')nameInput!: ElementRef;

  ngAfterViewInit(): void {
    this.nameInput.nativeElement.focus();
  }

  private _account: Account = <Account>{};


  @Input() set account(value: Account | undefined) {
    if (value == null) {
      this._account = <Account>{};
    } else {
      this._account = value;
    }
    this.form.get("name")?.setValue(this._account.name);
  }

  @Output() onSave: EventEmitter<Account> = new EventEmitter();
  @Output() onCancel: EventEmitter<Account> = new EventEmitter();

  @HostListener("window:keydown.escape", ['$event'])
  cancel() {
    this.onCancel.emit(this._account);
  }

  @HostListener("window:keydown.Enter", ['$event'])
  saveKey(event: any) {
    event.preventDefault();
    this.save();
  }

  save() {
    if (!this.form.invalid) {
      this._account.name = this.form.get("name")!.value == null ? "" : this.form.get("name")!.value!;
      this.onSave.emit(this._account);
    }
  }

  form = new FormGroup({
    name: new FormControl('', { nonNullable: true })
  });


}

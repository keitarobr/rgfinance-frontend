import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { Account } from '../../../api/account/account-api.service';

@Component({
  selector: 'app-account-card',
  standalone: true,
  imports: [ButtonModule, PanelModule],
  templateUrl: './account-card.component.html',
  styleUrl: './account-card.component.scss'
})
export class AccountCardComponent {

  @Input() account?: Account;
  @Output() onDelete: EventEmitter<Account> = new EventEmitter();
  @Output() onCancel: EventEmitter<null> = new EventEmitter();

  @HostListener("window:keydown.escape", [])
  cancel() {
    this.onCancel.emit();
  }

  delete() {
    this.onDelete.emit(this.account);
  }
}

import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { MonetaryTransaction } from '../../../api/monetary-transaction/monetary-transaction-api.service';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-monetary-transaction-card',
  standalone: true,
  imports: [PanelModule, ButtonModule],
  templateUrl: './monetary-transaction-card.component.html',
  styleUrl: './monetary-transaction-card.component.scss'
})
export class MonetaryTransactionCardComponent {
  @Input() monetaryTransaction?: MonetaryTransaction;
  @Output() onDelete: EventEmitter<MonetaryTransaction> = new EventEmitter();
  @Output() onCancel: EventEmitter<null> = new EventEmitter();

  @HostListener("window:keydown.escape", [])
  cancel() {
    this.onCancel.emit();
  }

  delete() {
    this.onDelete.emit(this.monetaryTransaction);
  }
}

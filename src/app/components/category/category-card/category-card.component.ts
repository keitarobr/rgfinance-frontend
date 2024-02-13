import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { Category } from '../../../api/category/category-api.service';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [PanelModule, ButtonModule],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss'
})
export class CategoryCardComponent {

  @Input() category?: Category;
  @Output() onDelete: EventEmitter<Category> = new EventEmitter();
  @Output() onCancel: EventEmitter<null> = new EventEmitter();

  @HostListener("window:keydown.escape", [])
  cancel() {
    this.onCancel.emit();
  }

  delete() {
    this.onDelete.emit(this.category);
  }


}

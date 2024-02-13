import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';

import { Category, CategoryAPIService } from '../../../api/category/category-api.service';
import { ButtonModule } from 'primeng/button';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [TableModule, PanelModule, ButtonModule, NgIf],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {

  rowCategory?: Category;

  @Input() navigationEnabled: boolean = true;
  @Input() categories: Category[] = [];
  @Output() onSelected: EventEmitter<Category> = new EventEmitter();
  @Output() onDeleted: EventEmitter<Category> = new EventEmitter();

  @HostListener("window:keydown.e", ['$event'])
  editKey(event: any) {
    if (! this.navigationEnabled) {
      return;
    }
    event.preventDefault();
    if (event && this.rowCategory) {
      this.edit(this.rowCategory);
    }
  }

  edit(category: Category) {
    this.onSelected.emit(category);
  }

  @HostListener("window:keydown.Delete", ['$event'])
  deleteKey(event: any) {
    if (! this.navigationEnabled) {
      return;
    }
    event.preventDefault();
    if (event && this.rowCategory) {
      this.delete(this.rowCategory);
    }
  }

  delete(category: Category) {
    this.onDeleted.emit(category);
  }

  @HostListener("window:keydown.ArrowDown", ['$event'])
  keyDown() {
    if (! this.navigationEnabled) {
      return;
    }
    if (this.rowCategory && ! this.categories.includes(this.rowCategory)) {
      this.rowCategory = undefined;
    }
    
    if (! this.rowCategory && this.categories.length > 0) {
      this.rowCategory = this.categories[0];
    } else if (this.rowCategory) {
      const idx = this.categories.indexOf(this.rowCategory);
      if (idx < (this.categories.length - 1)) {
        this.rowCategory = this.categories[idx + 1];
      }
    }
  }

  @HostListener("window:keydown.ArrowUp", ['$event'])
  keyUp() {
    if (! this.navigationEnabled) {
      return;
    }
    if (this.rowCategory && ! this.categories.includes(this.rowCategory)) {
      this.rowCategory = undefined;
    }
    
    if (! this.rowCategory && this.categories.length > 0) {
      this.rowCategory = this.categories[0];
    } else if (this.rowCategory) {
      const idx = this.categories.indexOf(this.rowCategory);
      if (idx > 0) {
        this.rowCategory = this.categories[idx - 1];
      }
    }
  }

}

import { Component, EventEmitter, Output, forwardRef } from '@angular/core';
import { Category, CategoryAPIService } from '../../../api/category/category-api.service';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule } from '@angular/forms';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { AnimationEvent } from '@angular/animations';

@Component({
  selector: 'app-category-dropdown',
  standalone: true,
  imports: [DropdownModule, FormsModule],
  templateUrl: './category-dropdown.component.html',
  styleUrl: './category-dropdown.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CategoryDropdownComponent),
      multi: true,
    },
  ]
})
export class CategoryDropdownComponent implements ControlValueAccessor {

  @Output() onShow = new EventEmitter<AnimationEvent>();
  @Output() onHide = new EventEmitter<AnimationEvent>();

hide($event: AnimationEvent) {
this.onHide.emit($event);
}
show($event: AnimationEvent) {
this.onShow.emit($event);
}
  onChange: any = () => {}
  disabled: boolean = false;

  constructor(categoriesAPI: CategoryAPIService) {
    categoriesAPI.listAll().subscribe(categoryList => this.categories = categoryList);
  }

  valueSelected(event: DropdownChangeEvent) {
    this.selectedCategory = event.value;
    this.onChange(event.value);
  }

  writeValue(obj: Category): void {
    this.selectedCategory = obj;
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

  categories: Category[] = [];
  selectedCategory? : Category;
}

import { Component, HostListener } from '@angular/core';
import { CategoryListComponent } from "../category-list/category-list.component";
import { CategoryFormComponent } from "../category-form/category-form.component";
import { Category, CategoryAPIService } from '../../../api/category/category-api.service';
import { NgIf } from '@angular/common';
import * as lodash from 'lodash';
import { CategoryCardComponent } from '../category-card/category-card.component';
import { catchError, of } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-category-register',
  standalone: true,
  templateUrl: './category-register.component.html',
  styleUrl: './category-register.component.scss',
  imports: [ButtonModule, CategoryListComponent, CategoryFormComponent, CategoryCardComponent, NgIf],
  providers: []
})
export class CategoryRegisterComponent {

  @HostListener("window:keydown.insert", ['$event'])
  newCategory() {
    if (!this.selectedCategory && ! this.selectedCategoryToDelete) {
      this.selectedCategory = {} as Category;    
    }
  }
  chooseCategoryDelete(category: Category) {
    this.selectedCategoryToDelete = category;
  }
  deleteCategory(category: Category) {
    this.api.delete(category).pipe(catchError(err => {
      this.messageService.add({ life: 3000, severity: 'error', summary: 'Error removing category', detail: err.error.message });
      return of(null);
    })).subscribe((result) => { if (result) { this.reloadCategories(); this.selectedCategoryToDelete = undefined; } });
  }
  cancelDelete() {
    this.selectedCategoryToDelete = undefined;
  }

  categories: Category[] = [];

  saveCategory(category: Category) {
    this.api.save(category).pipe(catchError(err => {
      this.messageService.add({ life: 3000, severity: 'error', summary: 'Error removing category', detail: err.error.message });
      return of(null);
    })).subscribe((result) => { if (result) { this.reloadCategories(); this.selectedCategory = undefined; }});
  }

  cancelEdit() {
    this.selectedCategory = undefined;
  }

  selectedCategory?: Category;
  selectedCategoryToDelete?: Category;

  chooseCategory(category: Category) {
    this.selectedCategory = lodash.cloneDeep(category);
  }

  constructor(private api: CategoryAPIService, private messageService: MessageService) {
    this.api = api;
    this.reloadCategories();
  }

  private reloadCategories() {
    this.api.listAll().subscribe(categories => this.categories = categories);
  }

}



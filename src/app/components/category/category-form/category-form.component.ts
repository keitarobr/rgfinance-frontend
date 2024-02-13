import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Category } from '../../../api/category/category-api.service';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [PanelModule, InputTextModule, InputGroupModule, InputGroupAddonModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent implements AfterViewInit {
  
  @ViewChild('name')nameInput!: ElementRef;

  ngAfterViewInit(): void {
    this.nameInput.nativeElement.focus();
  }

  private _category: Category = <Category>{};


  @Input() set category(value: Category | undefined) {
    if (value == null) {
      this._category = <Category>{};
    } else {
      this._category = value;
    }
    this.form.get("name")?.setValue(this._category.name);
  }

  @Output() onSave: EventEmitter<Category> = new EventEmitter();
  @Output() onCancel: EventEmitter<Category> = new EventEmitter();

  @HostListener("window:keydown.escape", ['$event'])
  cancel() {
    this.onCancel.emit(this._category);
  }

  @HostListener("window:keydown.Enter", ['$event'])
  saveKey(event: any) {
    event.preventDefault();
    this.save();
  }

  save() {
    if (!this.form.invalid) {
      this._category.name = this.form.get("name")!.value == null ? "" : this.form.get("name")!.value!;
      this.onSave.emit(this._category);
    }
  }

  form = new FormGroup({
    name: new FormControl('', { nonNullable: true })
  });


}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Category {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryAPIService {

  constructor(private http: HttpClient) { }

  listAll(): Observable<Category[]> {
    return this.http.get<Category[]>("http://estudos:3000/category/");
  }

  save(category: Category) {
    if (category.id > 0) {
      return this.http.patch<Category>(`http://estudos:3000/category/${category.id}`, category);
    } else {
      return this.http.post<Category>("http://estudos:3000/category", category);
    }
  }

  delete(category: Category) {
    return this.http.delete(`http://estudos:3000/category/${category.id}`);
  }
}

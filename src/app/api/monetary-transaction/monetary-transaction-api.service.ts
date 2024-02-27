import { Injectable } from '@angular/core';
import { Category } from '../category/category-api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MonetaryTransaction {
  id: number;
  date: Date;
  value: number;
  category: Category;
}

@Injectable({
  providedIn: 'root'
})
export class MonetaryTransactionApiService {

  constructor(private http: HttpClient) { }

  listAll(): Observable<MonetaryTransaction[]> {
    return this.http.get<MonetaryTransaction[]>("http://localhost:3000/transaction/");
  }

  save(monetaryTransaction: MonetaryTransaction) {
    if (monetaryTransaction.id > 0) {
      return this.http.patch<MonetaryTransaction>(`http://localhost:3000/transaction/${monetaryTransaction.id}`, monetaryTransaction);
    } else {
      return this.http.post<MonetaryTransaction>("http://localhost:3000/transaction", monetaryTransaction);
    }
  }

  delete(monetaryTransaction: MonetaryTransaction) {
    return this.http.delete(`http://localhost:3000/transaction/${monetaryTransaction.id}`);
  }
}

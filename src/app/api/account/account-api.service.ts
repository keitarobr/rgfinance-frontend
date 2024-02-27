import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface Account {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AccountAPIService {

  constructor(private http: HttpClient) { }

  listAll(): Observable<Account[]> {
    return this.http.get<Account[]>("http://localhost:3000/account/");
  }

  save(account: Account) {
    if (account.id > 0) {
      return this.http.patch<Account>(`http://localhost:3000/account/${account.id}`, account);
    } else {
      return this.http.post<Account>("http://localhost:3000/account", account);
    }
  }

  delete(account: Account) {
    return this.http.delete(`http://localhost:3000/account/${account.id}`);
  }
}

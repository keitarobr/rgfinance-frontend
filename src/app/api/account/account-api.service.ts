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
    return this.http.get<Account[]>("http://estudos:3000/account/");
  }

  save(account: Account) {
    if (account.id > 0) {
      return this.http.patch<Account>(`http://estudos:3000/account/${account.id}`, account);
    } else {
      return this.http.post<Account>("http://estudos:3000/account", account);
    }
  }

  delete(account: Account) {
    return this.http.delete(`http://estudos:3000/account/${account.id}`);
  }
}

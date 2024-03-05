import { Routes } from '@angular/router';
import { CategoryRegisterComponent } from './components/category/category-register/category-register.component';
import { AccountRegisterComponent } from './components/account/account-register/account-register.component';
import { MonetaryTransactionRegisterComponent } from './components/monetary-transaction/monetary-transaction-register/monetary-transaction-register.component';

export const routes: Routes = [
    { path: "category-register", component: CategoryRegisterComponent },
    { path: "account-register", component: AccountRegisterComponent },
    { path: "monetary-transaction-register", component: MonetaryTransactionRegisterComponent }
];

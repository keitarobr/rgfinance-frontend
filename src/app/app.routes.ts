import { Routes } from '@angular/router';
import { CategoryRegisterComponent } from './components/category/category-register/category-register.component';
import { AccountRegisterComponent } from './components/account/account-register/account-register.component';

export const routes: Routes = [
    { path: "category-register", component: CategoryRegisterComponent },
    { path: "account-register", component: AccountRegisterComponent }
];

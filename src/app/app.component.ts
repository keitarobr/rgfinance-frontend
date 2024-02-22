import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api/menuitem';
import { MenubarModule } from 'primeng/menubar';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenubarModule, MessagesModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService]
})
export class AppComponent {

  constructor(public router: Router) {

  }

  title = 'rgfinance-frontend';
  menuOptions: MenuItem[] = [
    {
      label: 'Configuration',
      icon: 'pi pi-fw pi-table',
      items: [
        {
          label: 'Categories',
          icon: 'pi pi-fw pi-table',
          command: () => {
            this.router.navigateByUrl("/category-register");
          }
        },
        {
          label: 'Accounts',
          icon: 'pi pi-fw pi-table',
          command: () => {
            this.router.navigateByUrl("/account-register");
          }
        }
      ]
    }
  ];
}

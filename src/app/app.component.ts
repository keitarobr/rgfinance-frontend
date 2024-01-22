import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenubarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
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
            alert('Categories');
          }
        }
      ]
    }
  ];
}

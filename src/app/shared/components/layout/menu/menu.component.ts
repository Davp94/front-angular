import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../../core/service/layout.service';
import { MenuitemComponent } from "../menuitem/menuitem.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MenuitemComponent, CommonModule],
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit{
  model: any[] = [];

  constructor(public layoutService: LayoutService) { }

  ngOnInit() {
      this.model = [
          {
              label: 'Home',
              items: [
                  { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
              ]
          },
          {
              label: 'Ecommerce',
              items: [
                  { label: 'Productos', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
                  { label: 'Pedidos', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] }
              ]
          },
      ];
  }
}

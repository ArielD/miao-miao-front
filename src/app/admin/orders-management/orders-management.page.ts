import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-orders-management',
  templateUrl: './orders-management.page.html',
  styleUrls: ['./orders-management.page.scss'],
})
export class OrdersManagementPage {

  constructor(
    private menu: MenuController
  ) {}

  public openMenu() {
    this.menu.open('start');
  }
}

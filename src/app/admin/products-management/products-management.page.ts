import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-products-management',
  templateUrl: './products-management.page.html',
  styleUrls: ['./products-management.page.scss'],
})
export class ProductsManagementPage implements OnInit {
  public isAddBtnVisible: boolean = false;

  constructor(
    private menu: MenuController,
    private router: Router,
    public navCtrl: NavController
  ) { 
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url == '/admin/products-management/list-products' || event.url == '/admin/products-management' || event.url == '/admin/products-management/list-products') {
          this.isAddBtnVisible = true;
        } else {
          this.isAddBtnVisible = false;
        }       
      }
    });
  }

  ngOnInit() {
  }

  public openMenu() {
    this.menu.open('start');
  }

  public navigateToAddProduct() {
    this.navCtrl.navigateRoot(['admin/products-management/add-product'])
  }

}

import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/shared/models/user.model';

//services
import { OrderService } from 'src/app/shared/services/order.service';
import { ProductsService } from 'src/app/shared/services/products.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

//models
import { OrderModel } from 'src/app/shared/models/order.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  public currentUser: UserModel;
  public orders: OrderModel[] = [new OrderModel()];

  constructor(
    private authenticationService: AuthenticationService,
    private orderService: OrderService,
    private productsService: ProductsService
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.currentUser = await this.authenticationService.getCurrentUser().toPromise();
    let orderResponse = await this.orderService.getAllByUserId(this.currentUser._id).toPromise();
    this.orders = orderResponse.data;

    this.getCurrentProducts();
  }

  public async getCurrentProducts() {
    for (let item of this.orders) {
      let product = [];
      for (let id of item.productsId) {
        product.push(id);
        let temp = await this.productsService.getProductsById(product).toPromise();
        item.products = temp.data;
      }
    }
    this.getQuantity();
  }

  public getQuantity(): void {
    for (let order of this.orders) {
      if (order.products) {
        for (let i = 0; i < order.products.length; i++) {
          order.products[i].quantity = order.productsId[i].quantity;
        }
      }
    }
  }
}



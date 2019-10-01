import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/shared/services/order.service';
import { OrderModel, OrderProductModel } from 'src/app/shared/models/order.model';
import { UserModel } from 'src/app/shared/models/user.model';
import { UsersService } from 'src/app/shared/services/users.service';
import { ProductsService } from 'src/app/shared/services/products.service';
import { environment } from 'src/environments/environment';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.page.html',
  styleUrls: ['./detail-order.page.scss'],
})
export class DetailOrderPage implements OnInit {
  public apiURL = environment.apiTest; 
  private orderId: string;
  public order: OrderModel;
  public user: UserModel;
  public products: OrderProductModel[] = [new OrderProductModel()];
  private productsId: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private usersService: UsersService,
    private productsService: ProductsService,
    private _location: Location,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.orderId = this.route.snapshot.paramMap.get('id');

    let order = await this.orderService.getOrderById(this.orderId).toPromise();
    this.order = order.data;
    this.user = await this.usersService.getUserById(this.order.userId).toPromise();

    for (let item of this.order.productsId) {
      this.productsId.push(item._id);
    }

    let products = await this.productsService.getProductsById(this.productsId).toPromise();
    this.products = products.data;
debugger
    for (let i = 0; i < this.order.productsId.length; i++) {
      this.products[i].quantity = this.order.productsId[i].quantity;
      console.log(this.products[i].quantity);
      
    }
  }

  public navigateToUserEdit(id: string): void {
    this.navCtrl.navigateRoot(['admin/users-management/edit-user', id]);
  }

  public navigateToProductEdit(id: string): void {
    this.navCtrl.navigateRoot(['admin/products-management/edit-product', id]);
  }

  public navigateToEditOrder(id: string): void {
    this.navCtrl.navigateRoot(['admin/orders-management/edit-order', id]);
  }

  public navigateBack() {
    this._location.back();
  }
}

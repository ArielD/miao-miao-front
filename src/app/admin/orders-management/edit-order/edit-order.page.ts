import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/shared/services/order.service';
import { OrderModel, OrderProductModel, OrderStatusModel } from 'src/app/shared/models/order.model';
import { UserModel } from 'src/app/shared/models/user.model';
import { UsersService } from 'src/app/shared/services/users.service';
import { ProductsService } from 'src/app/shared/services/products.service';
import { environment } from 'src/environments/environment';
import { NavController } from '@ionic/angular'; 
//enums
import { OrderStatus } from 'src/app/shared/enums/order-status.enum';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.page.html',
  styleUrls: ['./edit-order.page.scss'],
})
export class EditOrderPage implements OnInit {
  public apiURL = environment.apiTest; 
  private orderId: string;
  public order: OrderModel;
  public user: UserModel;
  public products: OrderProductModel[] = [new OrderProductModel()];
  private productsId: string[] = [];
  public selectedStatus: number;
  public isChange: boolean;
  public orderStatus: OrderStatusModel[] = [
    { name: 'Pending', value: OrderStatus.Pending },
    { name: 'Confirm', value: OrderStatus.Confirmed },
    { name: 'Decline', value: OrderStatus.Declined }
  ]

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

    for (let i = 0; i < this.order.productsId.length; i++) {
      this.products[i].quantity = this.order.productsId[i].quantity;
    }

    this.selectedStatus = this.order.status;
    this.isChange = false;
  }

  public changeStatus(): void {
    this.isChange = true;
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

  public save(): void {
    this.order.status = this.selectedStatus;
    this.orderService.updateOrder(this.order).subscribe();
    this.navigateBack();
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, NavController, IonInfiniteScroll } from '@ionic/angular';

//models
import { OrderModel, OrderStatusModel } from 'src/app/shared/models/order.model';
import { UserModel } from 'src/app/shared/models/user.model';

//services
import { OrderService } from 'src/app/shared/services/order.service';
import { UsersService } from 'src/app/shared/services/users.service';

//enums
import { OrderStatus } from 'src/app/shared/enums/order-status.enum';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.page.html',
  styleUrls: ['./list-orders.page.scss'],
})
export class ListOrdersPage implements OnInit {
  @ViewChild(IonInfiniteScroll, { read: true, static: false }) infiniteScroll: IonInfiniteScroll;

  public orders: OrderModel[] = [new OrderModel()];
  public loadedOrders: OrderModel[];
  public filterOrders: OrderModel[] = [new OrderModel()];
  public users: UserModel[];
  public selectedStatus: number;
  public orderStatus: OrderStatusModel[] = [
    { name: 'All', value: 3 },
    { name: 'Pending', value: OrderStatus.Pending },
    { name: 'Confirmed', value: OrderStatus.Confirmed },
    { name: 'Declined', value: OrderStatus.Declined }
  ]

  constructor(
    private menu: MenuController,
    private orderService: OrderService,
    private usersService: UsersService,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getOrders();
    this.getAllUsers();
    this.selectedStatus = this.orderStatus[0].value;
  }

  async getOrders(): Promise<void> {
    let orderTemp = await this.orderService.getFewOrder(0, 10, this.selectedStatus).toPromise();
    this.orders = orderTemp.data;
    this.loadedOrders = orderTemp.data;
    this.filterOrders = orderTemp.data;
  }

  async getAllUsers(): Promise<void> {
    this.users = await this.usersService.getAll().toPromise();
  }

  public navigateToUserEdit(id: string): void {
    this.navCtrl.navigateRoot(['admin/users-management/edit-user', id]);
  }

  public openMenu() {
    this.menu.open('start');
  }

  public filterByStatus(selectedStatus: number): OrderModel[] {
    this.loadedOrders = this.filterOrders;
    if (selectedStatus == OrderStatus.Pending) {
      this.loadedOrders = this.loadedOrders.filter((x) => {
        return x.status === OrderStatus.Pending;
      })
    }
    if (selectedStatus == OrderStatus.Confirmed) {
      this.loadedOrders = this.loadedOrders.filter((x) => {
        return x.status === OrderStatus.Confirmed;
      })
    }
    if (selectedStatus == OrderStatus.Declined) {
      this.loadedOrders = this.loadedOrders.filter((x) => {
        return x.status === OrderStatus.Declined;
      })
    }
    if (selectedStatus == 3) {
      return this.loadedOrders;
    }
  }

  public detailOrder(id: string): void {
    this.navCtrl.navigateRoot(['admin/orders-management/detail-order', id]);
  }

  public editOrder(id: string): void {
    this.navCtrl.navigateRoot(['admin/orders-management/edit-order', id]);
  }

  async loadData(event) {
    let orderTemp = await this.orderService.getFewOrder(this.loadedOrders.length, 10, this.selectedStatus).toPromise();
    this.orders.push(...orderTemp.data);
     setTimeout(() => {   
      if (orderTemp.data.length > 0) {
        this.loadedOrders = this.orders;
        event.target.complete();
      } else {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
}

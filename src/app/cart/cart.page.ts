import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { CartModel, LocalStorageCartModel } from '../shared/models/cart.model';
import { CartService } from '../shared/services/cart.service';
import { AlertController } from '@ionic/angular';
import { OrderService } from '../shared/services/order.service';
import { OrderModel } from '../shared/models/order.model';
import { UserModel } from '../shared/models/user.model';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  public apiURL = environment.apiTest;
  public currentProductCart: CartModel[];
  public localCart: LocalStorageCartModel[];
  public totalPrice: number = 0;
  public currentOrder: OrderModel = new OrderModel();
  private currentUser: UserModel;

  constructor(
    private router: Router,
    private cartService: CartService,
    private alertCtrl: AlertController,
    private orderService: OrderService,
    private authService: AuthenticationService
  ) {
  }

  ionViewWillEnter() {
    debugger
    this.localCart = JSON.parse(localStorage.getItem('cart'));
    if (this.localCart) {
      this.currentProductCart = [];
      for (let item of this.localCart) {
        this.cartService.getProduct(item._id).subscribe((x) => {
          this.currentProductCart.push(x);
          x.quantity = item.quantity;
          this.totalPrice = this.totalPrice + x.quantity * x.price
        })
      }
    }

    this.authService.getCurrentUser().subscribe( (x) => {
      this.currentUser = x;
    });
    
    
  }

  ngOnInit() {
  }

  public navigateToDetails(id: string): void {
    this.router.navigate(['tabs/product-details', id])
  }

  public removeOne(item: CartModel) {
    if (item.quantity !== 1) {
      item.quantity = item.quantity - 1;
      this.totalPrice -= item.price;
    } else {
      item.quantity = 1;
      this.alertCtrl.create({
        header: 'Are you sure?', message: 'Do you really want to delete the product from your cart?',
        buttons: [{
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            this.cartService.removeProduct(item._id);
            this.currentProductCart = this.currentProductCart.filter((x) => {
              return x._id !== item._id;
            })
            this.totalPrice = this.totalPrice - item.price;

            for (let item of this.currentProductCart) {
              this.localCart.push({_id: item._id, quantity: item.quantity})
            }
            localStorage.setItem('cart', JSON.stringify(this.localCart));

            if (this.currentProductCart.length < 1) {
              localStorage.removeItem('cart');
              this.localCart = null;
            }
          }
        }]
      })
        .then(AlertEl => {
          AlertEl.present();
        });
    }
    this.cartService.updateCart({ _id: item._id, quantity: item.quantity })
  }

  async buy() {
    const alert = await this.alertCtrl.create({
      header: 'Woohoo',
      // subHeader: 'Woohoo',
      message: 'Thanks for your order c:',
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.localCart = JSON.parse(localStorage.getItem('cart'));
            this.currentOrder.productsId = this.localCart;
            this.currentOrder.status = 0;
            this.currentOrder.date = new Date();
            this.currentOrder.userId = this.currentUser._id;
            this.currentOrder.totalPrice = this.totalPrice;
            this.orderService.createOrder(this.currentOrder).subscribe();

            this.localCart = null;
            localStorage.removeItem('cart');
            this.currentProductCart = null;
          }
        }
      ]
    });

    await alert.present();
  }

  public addOne(item: CartModel) {
    if (item.quantity !== 100) {
      item.quantity = item.quantity + 1;
      this.totalPrice += item.price;
    } else {
      item.quantity = 100;
    }
    this.cartService.updateCart({ _id: item._id, quantity: item.quantity });
  }

  public cleanCart(): void {
    this.alertCtrl.create({
      header: 'Are you sure?', message: 'Do you really want to delete all products from the cart?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Delete',
        handler: () => {
          this.cartService.cleanCart();
          this.localCart = null;
          localStorage.removeItem('cart');
        }
      }]
    })
      .then(AlertEl => {
        AlertEl.present();
      });
  }
}

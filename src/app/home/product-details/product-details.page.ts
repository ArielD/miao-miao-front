import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/shared/models/products.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/shared/services/products.service';
import { environment } from 'src/environments/environment';
import { UserModel } from 'src/app/shared/models/user.model';
import { UsersService } from 'src/app/shared/services/users.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { LocalStorageCartModel } from 'src/app/shared/models/cart.model';
import { ToastController } from '@ionic/angular';
import { Location } from "@angular/common";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage {
  public apiURL = environment.apiTest;
  public product: ProductModel;
  public productId: string;
  public isProductFavorite: boolean = false;
  public currentUser: UserModel;
  public currentCart: LocalStorageCartModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private usersService: UsersService,
    private authService: AuthenticationService,
    private router: Router,
    public toastController: ToastController,
    private _location: Location
  ) {

  }

  ionViewWillEnter() {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.productsService.getProduct(this.productId).subscribe((x) => {
      this.product = x;
    })
    this.authService.getCurrentUser().subscribe((x) => {
      this.currentUser = x;
      for (let item of this.currentUser.favorites) {
        if (item == this.productId) {
          this.isProductFavorite = true;
        }
      }
    })
  }


  public navigateBack() {
    this._location.back();
  }

  public addToFavorites(): void {
    this.isProductFavorite = !this.isProductFavorite;

    if (this.isProductFavorite) {
      this.currentUser.favorites.push(this.productId);
    }

    if (!this.isProductFavorite) {
      this.currentUser.favorites = this.currentUser.favorites.filter((x) => {
        return x !== this.productId;
      })
    }

    for (let id of this.currentUser.favorites) {
      this.productsService.getProduct(id).subscribe((x) => {
        let allFavoriteProducts: ProductModel[] = [];
        allFavoriteProducts.push(x);
        this.productsService.setFavoriteProduts(allFavoriteProducts);
      });
    }

    this.usersService.updateUser(this.currentUser).subscribe();
    this.authService.setCurrentUserSubject(this.currentUser);
  }

  public async AddToCart() {
    let currentCart: LocalStorageCartModel = {
      _id: this.productId,
      quantity: 1
    };
    let localCart: LocalStorageCartModel[] = JSON.parse(localStorage.getItem('cart'));
    if (localCart) {
      for (let item of localCart) {
        if (item._id == this.productId) {
          const toast = await this.toastController.create({
            message: 'You have this product in your Cart',
            duration: 1000
          });
          toast.present();
          return;
        } else {
          this.currentCart = [];
          this.currentCart.push(...localCart);
          this.currentCart.push(currentCart);
        }
      }
    } else {
      this.currentCart.push(currentCart);
    }
    localStorage.setItem('cart', JSON.stringify(this.currentCart));
  }
}

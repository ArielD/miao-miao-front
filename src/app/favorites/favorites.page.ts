import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from "@angular/common";
import { AuthenticationService } from '../shared/services/authentication.service';
import { UserModel } from '../shared/models/user.model';
import { ProductModel } from '../shared/models/products.model';
import { ProductsService } from '../shared/services/products.service';
import { environment } from 'src/environments/environment';
import { UsersService } from '../shared/services/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  public apiURL = environment.apiTest;
  public currentUser: UserModel;
  public favoritesProducts: ProductModel[];
  public favoriteSubscribe: Subscription;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private productsService: ProductsService,
    private usersService: UsersService,
    private _location: Location
  ) {
  }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.authService.getCurrentUser().subscribe((x) => {
      this.currentUser = x;
    })
    this.productsService.getFavoriteProducts().subscribe((x) => {
      this.favoritesProducts = x;
    });
  }


  public navigateBack() {
    this._location.back();
  }

  public navigateToDetails(id: string) {
    this.router.navigate(['tabs/product-details', id])
  }

  public addToFavorites(item: ProductModel, event: Event) {
    item.isFavorite = !item.isFavorite;
    event.stopPropagation();

    if (item.isFavorite) {
      this.currentUser.favorites.push(item._id);
    }

    if (!item.isFavorite) {
      this.currentUser.favorites = this.currentUser.favorites.filter((x) => {
        return x !== item._id;
      })
    }
  }

  ionViewDidLeave() {

    if (this.currentUser.favorites.length > 0) {
      this.productsService.getProductsById(this.currentUser.favorites).subscribe((x) => {
        this.favoritesProducts = x.data;
        this.productsService.setFavoriteProduts(this.favoritesProducts);
      })
    } else {
      this.productsService.setFavoriteProduts([]);
      this.favoritesProducts = [];
    }
    this.usersService.updateUser(this.currentUser).subscribe();
    this.authService.setCurrentUserSubject(this.currentUser);
    // this.favoriteSubscribe.unsubscribe();
  }
}

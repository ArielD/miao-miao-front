import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/shared/models/products.model';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Subscription } from 'rxjs';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.page.html',
  styleUrls: ['./list-products.page.scss'],
})
export class ListProductsPage implements OnInit {
  public products: ProductModel[];
  public subscribe: Subscription;
  public searchText: string;
  public updatedProduct: ProductModel;

  constructor(
    private productsService: ProductsService,
    private alertCtrl: AlertController,
    public navCtrl: NavController
  ) {
    // if (this.productsService.getUpdatedProduct()) {
    //   this.updatedProduct = this.productsService.getUpdatedProduct()
    // }

    this.getAllProducts().then(data => {
      this.products = data;
      if (this.updatedProduct) {
        for (let i = 0; i < this.products.length; i++) {
          if (this.products[i]._id == this.updatedProduct._id) {
            this.products[i] = this.updatedProduct;
          }
        }
      }

      // if (this.productsService.getAddedProduct()) {
      //   this.products.push(this.productsService.getAddedProduct());
      //   this.productsService.setAddedProduct(null);
      // }
      // this.products.forEach((item) => {
      //   if (item._id == this.updatedProduct._id) {
      //     item = this.updatedProduct
      //   }
      // })
    });
  }

  ngOnInit() {

  }

  public getAllProducts(): Promise<ProductModel[]> {
    return new Promise((resolve) => {
      return this.productsService.getAll().subscribe((x) => {
        resolve(x)
      })
    })
  }

  public editProduct(product: ProductModel) {
    this.navCtrl.navigateRoot(['admin/products-management/edit-product', product._id])
   // this.productsService.setUpdatedProduct(product)
  }

  deleteProduct(id: string) {
    this.alertCtrl.create({
      header: 'Are you sure?', message: 'Do you really want to delete the product?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Delete',
        handler: () => {
          this.productsService.deleteProduct(id).subscribe();
          this.productsService.getAll().subscribe((x) => {
            this.products = x;
          })
        }
      }]
    })
      .then(AlertEl => {
        AlertEl.present();
      });
  }

  ngOnDestroy() {
    //this.subscribe.unsubscribe();  
  }
}

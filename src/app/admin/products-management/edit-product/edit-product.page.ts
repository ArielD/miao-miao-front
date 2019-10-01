import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { ProductModel } from 'src/app/shared/models/products.model';
import { ProductsService } from 'src/app/shared/services/products.service';
import { environment } from 'src/environments/environment';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.page.html',
  styleUrls: ['./edit-product.page.scss'],
})
export class EditProductPage implements OnInit {
  private apiURL = environment.apiTest; 
  public productId: string;
  public product: ProductModel;
  public productImage: File;
  public previewImage;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    public navCtrl: NavController,
    private _location: Location
  ) { 
    this.productId = this.route.snapshot.paramMap.get('id');
    this.productsService.getProduct(this.productId).subscribe((x) => {
      this.product = x;
    })
  }

  ngOnInit() {
  }

  public navigateBack() {
    this._location.back();
  }

  public updateProduct() {
    this.productsService.updateProduct(this.product).subscribe();
    //this.productsService.setUpdatedProduct(this.product);
    this.productsService.uploadImage(this.productImage, this.productId).subscribe();
    this.navigateBack();
  }

  public uploadImage(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.previewImage = reader.result;
      reader.readAsDataURL(file);
    }
    this.productImage = event.target.files[0];
  }
}

import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../shared/services/products.service';
import { ProductModel } from '../shared/models/products.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public apiURL = environment.apiTest; 
  public products: ProductModel[];
  public searchText: string;

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {
    this.productsService.getAll().subscribe((x) => {
      this.products = x;
    })
   }

  ngOnInit() {
  }

  public getImage(id: string) {
    this.productsService.getImage(id).subscribe((x) => {
      console.log(x);
    });
  }

  public checkError(event: Event) {
    console.log(event);   
  }

  public navigateToDetails(id: string) {
    this.router.navigate(['tabs/product-details', id])
  }
}

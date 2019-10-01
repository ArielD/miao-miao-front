import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { ProductModel } from '../models/products.model';
import { ResponseModel } from '../models/response.model';
import { AuthenticationService } from './authentication.service';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiURL = environment.apiTest;
  private currentUser: UserModel;
  private currentFavoriteProducts: BehaviorSubject<ProductModel[]> = new BehaviorSubject<ProductModel[]>([]);

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {
     this.getAllFavoriteProducts();
   }

  getAll(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.apiURL + 'products');
  }

  getProduct(id: string): Observable<ProductModel> {
    return this.http.get<ProductModel>(this.apiURL + `products/getProduct?_id=${id}`);
  }

  public getFavoriteProducts(): Observable<ProductModel[]> {
    return this.currentFavoriteProducts.asObservable();
  }

  public setFavoriteProduts(favoriteProducts: ProductModel[]): void {
    this.getAllFavoriteProducts();
  }

  public getAllFavoriteProducts(): void {
    this.authService.getCurrentUserSubject().subscribe((x) => {
      this.currentUser = x;
      if (this.currentUser.favorites) {
        this.getProductsById(this.currentUser.favorites).subscribe((x) => {
          for (let item of x.data) {
            item.isFavorite = true;
          }
          this.currentFavoriteProducts.next(x.data);
        })
      } 
    })
  }

  public getProductsById(model: string[]): Observable<ResponseModel<ProductModel[]>> {
    let obj = { ids: model }
    return this.http.post<ResponseModel<ProductModel[]>>(this.apiURL + 'products/getProductsById', obj)
  }

  addProduct(model: ProductModel): Observable<ResponseModel<ProductModel>> {
    return this.http.post<ResponseModel<ProductModel>>(this.apiURL + 'products/createProduct', model);
  }

  updateProduct(model: ProductModel): Observable<ResponseModel<ProductModel>> {
    return this.http.post<ResponseModel<ProductModel>>(this.apiURL + 'products/updateProduct', model);
  }

  uploadImage(image: File, id: string): Observable<ResponseModel<ProductModel>> {
    const formData = new FormData();
    formData.append('file', image as File);
    
    return this.http.post<ResponseModel<ProductModel>>(this.apiURL + `products/image?_id=${id}`, formData, { headers: null });
  }

  getImage(id: string): Observable<string> {
    return this.http.get<string>(this.apiURL + `products/uploads/${id}`)
  }

  deleteProduct(id: string): Observable<string> {
    return this.http.get<string>(this.apiURL + `products/deleteProduct?_id=${id}`)
  }

  public fullRequest(image: File, model: ProductModel): Observable<any> {
    return new Observable((observer) => {
      this.addProduct(model).subscribe((product: any) => {
        this.uploadImage(image, product.data._id).subscribe((uploadedImg) => {
          observer.next(uploadedImg);
          observer.complete();
        });
      })
    })
  }
}

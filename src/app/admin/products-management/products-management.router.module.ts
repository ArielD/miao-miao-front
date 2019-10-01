import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsManagementPage } from './products-management.page';

const routes: Routes = [
  {
    path: '',
    component: ProductsManagementPage,
    children: [
      {
        path: 'add-product',
        loadChildren: './add-product/add-product.module#AddProductPageModule',
        pathMatch: 'full'
      },
      {
        path: 'edit-product/:id',
        loadChildren: './edit-product/edit-product.module#EditProductPageModule',
        pathMatch: 'full'
      },
      {
        path: 'list-products',
        loadChildren: './list-products/list-products.module#ListProductsPageModule',
        pathMatch: 'full'
      },
      {
        path: '',
        redirectTo: 'list-products',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'list-products',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProductsManagementPageRoutingModule {}

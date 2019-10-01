import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPage } from './admin.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPage,
    children: [
      {
        path: 'users-management',
        loadChildren: './users-management/users-management.module#UsersManagementPageModule'
      },
      {
        path: 'products-management',
        loadChildren: './products-management/products-management.module#ProductsManagementPageModule'
      },
      {
        path: 'orders-management',
        loadChildren: './orders-management/orders-management.module#OrdersManagementPageModule',
      },
      {
        path: '',
        redirectTo: 'users-management',
      }
    ]
  },
  {
    path: '',
    redirectTo: 'users-management',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminPageRoutingModule {}

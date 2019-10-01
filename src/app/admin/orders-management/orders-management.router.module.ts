import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersManagementPage } from './orders-management.page';

const routes: Routes = [
  {
    path: '',
    component: OrdersManagementPage,
    children: [
      {
        path: 'list-orders',
        loadChildren: './list-orders/list-orders.module#ListOrdersPageModule',
        pathMatch: 'full'
      },
      {
        path: 'edit-order/:id',
        loadChildren: './edit-order/edit-order.module#EditOrderPageModule',
        pathMatch: 'full'
      },
      {
        path: 'detail-order/:id',
        loadChildren: './detail-order/detail-order.module#DetailOrderPageModule',
        pathMatch: 'full'
      },
      {
        path: '',
        redirectTo: 'list-orders',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'list-orders',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class OrdersManagementPageRoutingModule {}

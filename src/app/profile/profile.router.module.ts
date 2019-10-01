import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePage } from './profile.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
    children: [
      {
        path: 'profile-list',
        loadChildren: './profile-list/profile-list.module#ProfileListPageModule'
      },
      {
        path: 'orders',
        loadChildren: './orders/orders.module#OrdersPageModule'
      },
      {
        path: '',
        redirectTo: 'profile-list',
      }
    ]
  },
  {
    path: '',
    redirectTo: 'profile-list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProfilePageRoutingModule {}

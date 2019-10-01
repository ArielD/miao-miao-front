import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersManagementPage } from './users-management.page';

const routes: Routes = [
  {
    path: '',
    component: UsersManagementPage,
    children: [
      {
        path: 'add-user',
        loadChildren: './add-user/add-user.module#AddUserPageModule',
        pathMatch: 'full'
      },
      {
        path: 'edit-user/:id',
        loadChildren: './edit-user/edit-user.module#EditUserPageModule',
        pathMatch: 'full'
      },
      {
        path: 'list-users',
        loadChildren: './list-users/list-users.module#ListUsersPageModule',
        pathMatch: 'full'
      },
      {
        path: '',
        redirectTo: 'list-users',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'list-users',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UsersManagementPageRoutingModule {}

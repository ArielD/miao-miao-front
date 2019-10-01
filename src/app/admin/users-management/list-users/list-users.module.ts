import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListUsersPage } from './list-users.page';

//modules
import { SharedModule } from 'src/app/shared/modules/shared.module';

const routes: Routes = [
  {
    path: '',
    component: ListUsersPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListUsersPage]
})
export class ListUsersPageModule {}

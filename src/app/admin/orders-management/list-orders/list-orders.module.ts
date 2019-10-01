import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListOrdersPage } from './list-orders.page';

//modules
import { SharedModule } from 'src/app/shared/modules/shared.module';

const routes: Routes = [
  {
    path: '',
    component: ListOrdersPage
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
  declarations: [ListOrdersPage]
})
export class ListOrdersPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListProductsPage } from './list-products.page';

//modules
import { SharedModule } from 'src/app/shared/modules/shared.module';

const routes: Routes = [
  {
    path: '',
    component: ListProductsPage
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
  declarations: [ListProductsPage]
})
export class ListProductsPageModule {}

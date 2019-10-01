import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ProductsManagementPage } from './products-management.page';
import { ProductsManagementPageRoutingModule } from './products-management.router.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsManagementPageRoutingModule
  ],
  declarations: [ProductsManagementPage]
})
export class ProductsManagementPageModule {}

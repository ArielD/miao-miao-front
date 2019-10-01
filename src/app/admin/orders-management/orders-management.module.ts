import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OrdersManagementPage } from './orders-management.page';

import { OrdersManagementPageRoutingModule } from './orders-management.router.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdersManagementPageRoutingModule
  ],
  declarations: [OrdersManagementPage]
})
export class OrdersManagementPageModule {}

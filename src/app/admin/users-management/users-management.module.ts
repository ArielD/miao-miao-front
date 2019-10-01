import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { UsersManagementPage } from './users-management.page';
import { UsersManagementPageRoutingModule } from './users-management.router.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsersManagementPageRoutingModule
  ],
  declarations: [UsersManagementPage]
})
export class UsersManagementPageModule {}

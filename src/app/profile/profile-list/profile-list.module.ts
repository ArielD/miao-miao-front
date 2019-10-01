import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import {MatListModule} from '@angular/material/list';

import { ProfileListPage } from './profile-list.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MatListModule
  ],
  declarations: [ProfileListPage]
})
export class ProfileListPageModule {}

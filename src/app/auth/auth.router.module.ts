import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPage } from './auth.page';

const routes: Routes = [
  {
    path: '',
    component: AuthPage,
    children: [
      {
        path: 'signin',
        loadChildren: './signin/signin.module#SigninPageModule'
      },
      {
        path: 'signup',
        loadChildren: './signup/signup.module#SignupPageModule'
      },
      {
        path: '',
        redirectTo: 'signin',
      }
    ]
  },
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthPageRoutingModule { }

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { Role } from './shared/enums/role.enum';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminPageModule',
    canActivate: [AuthGuard],
    data: {
      roles: [Role.Admin],
    }
  },
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' }



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '', children: [
    { path: 'login', loadChildren: './authentication/authentication.module#AuthenticationModule' },
    { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
    { path: 'manager', loadChildren: './manager/manager.module#ManagerModule' },
    { path: 'mechanic', loadChildren: './mechanic/mechanic.module#MechanicModule' },
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

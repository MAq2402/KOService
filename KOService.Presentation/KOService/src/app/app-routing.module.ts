import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './authentication/guards/auth.guard';
import { Role } from './shared/enums/Role';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '', children: [
    { path: 'login', loadChildren: './authentication/authentication.module#AuthenticationModule'},
    { path: 'admin', loadChildren: './admin/admin.module#AdminModule', canActivate: [AuthGuard], data: {role: Role.admin} },
    { path: 'manager', loadChildren: './manager/manager.module#ManagerModule', canActivate: [AuthGuard], data: {role: Role.manager} },
    { path: 'mechanic', loadChildren: './mechanic/mechanic.module#MechanicModule', canActivate: [AuthGuard], data: {role: Role.mechanic} },
    { path: 'client', loadChildren: './client/client.module#ClientModule'}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

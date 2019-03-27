import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

const managerRoutes: Routes = [
  { path: '', redirectTo: '/manager/home' },
  { path: '', children: [
    { path: 'home', component: HomeComponent }
  ]}
];

@NgModule({
  imports: [ RouterModule.forChild(managerRoutes) ],
  exports: [ RouterModule ]
})
export class  ManagerRoutingModule {}

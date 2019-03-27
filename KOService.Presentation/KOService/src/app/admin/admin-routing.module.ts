import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

const adminRoutes: Routes = [
    { path: '', redirectTo: '/admin/home' },
    { path: '', children: [
      { path: 'home', component: HomeComponent }
    ]}
];

@NgModule({
  imports: [ RouterModule.forChild(adminRoutes) ],
  exports: [ RouterModule ]
})
export class  AdminRoutingModule {}

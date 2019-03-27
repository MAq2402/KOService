import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

const mechanicRoutes: Routes = [
  { path: '', redirectTo: '/mechanic/home' },
  { path: '', children: [
    { path: 'home', component: HomeComponent }
  ]}
];

@NgModule({
  imports: [ RouterModule.forChild(mechanicRoutes) ],
  exports: [ RouterModule ]
})
export class  MechanicRoutingModule {}

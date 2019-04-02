import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

const mechanicRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: '', children: [
    {  }
  ]}
];

@NgModule({
  imports: [ RouterModule.forChild(mechanicRoutes) ],
  exports: [ RouterModule ]
})
export class  MechanicRoutingModule {}

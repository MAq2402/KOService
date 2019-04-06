import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

const managerRoutes: Routes = [
  { path: '', component: HomeComponent },
  // { path: '', children: [
  //   {  }
  // ]}
];

@NgModule({
  imports: [ RouterModule.forChild(managerRoutes) ],
  exports: [ RouterModule ]
})
export class  ManagerRoutingModule {}

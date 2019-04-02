import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

const adminRoutes: Routes = [
    { path: '', component: HomeComponent }/*,
    { path: '', children: [
      { path: 'home', component: HomeComponent },
      { path: 'test', component: TestComponent }
    ]}*/
];

@NgModule({
  imports: [ RouterModule.forChild(adminRoutes) ],
  exports: [ RouterModule ]
})
export class  AdminRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddRepairComponent } from './add-repair/add-repair.component';

const managerRoutes: Routes = [
  { path: 'addRepair', component: AddRepairComponent },
  { path: '', component: HomeComponent}
];

@NgModule({
  imports: [ RouterModule.forChild(managerRoutes) ],
  exports: [ RouterModule ]
})
export class  ManagerRoutingModule {}

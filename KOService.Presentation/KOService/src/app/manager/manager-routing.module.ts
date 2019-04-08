import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import {WorkersTasksComponent} from './activity-manager/workers-tasks/workers-tasks.component'

const managerRoutes: Routes = [
  { path: '', component: WorkersTasksComponent },
  { path: '', children: [
    {  }
  ]}
];

@NgModule({
  imports: [ RouterModule.forChild(managerRoutes) ],
  exports: [ RouterModule ]
})
export class  ManagerRoutingModule {}

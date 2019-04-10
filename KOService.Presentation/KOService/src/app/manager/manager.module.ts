import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ManagerRoutingModule } from './manager-routing.module';
import { SharedModule } from '../shared/shared.module';
import { WorkersTasksComponent } from './activity-manager/workers-tasks/workers-tasks.component';

@NgModule({
  imports: [
    SharedModule,
    ManagerRoutingModule
  ],
  declarations: [HomeComponent, WorkersTasksComponent]
})
export class ManagerModule { }

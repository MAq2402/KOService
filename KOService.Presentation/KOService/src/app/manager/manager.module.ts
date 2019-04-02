import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ManagerRoutingModule } from './manager-routing.module';
import { SharedModule } from '../shared/shared.module';
import { WorkersTasksComponent } from './activity-manager/workers-tasks/workers-tasks.component';

@NgModule({
  imports: [
    CommonModule,
    ManagerRoutingModule,
    SharedModule
  ],
  declarations: [HomeComponent, WorkersTasksComponent]
})
export class ManagerModule { }

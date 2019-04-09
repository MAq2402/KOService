import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ManagerRoutingModule } from './manager-routing.module';
import { SharedModule } from '../shared/shared.module';
import { WorkersTasksComponent } from './activity-manager/workers-tasks/workers-tasks.component';
import {MaterialModule} from '../shared/material/material.module'
import { ActivityCreatorComponent } from './activity-manager/activity-creator/activity-creator.component';

@NgModule({
  imports: [
    CommonModule,
    ManagerRoutingModule,
    SharedModule,
    MaterialModule
    
  ],
  declarations: [HomeComponent, WorkersTasksComponent, ActivityCreatorComponent],
  entryComponents: [ActivityCreatorComponent]
})
export class ManagerModule { }

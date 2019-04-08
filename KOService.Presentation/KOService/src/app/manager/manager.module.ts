import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ManagerRoutingModule } from './manager-routing.module';
import { SharedModule } from '../shared/shared.module';
import { WorkersTasksComponent } from './activity-manager/workers-tasks/workers-tasks.component';
import { MatTableModule } from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  imports: [
    CommonModule,
    ManagerRoutingModule,
    SharedModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule
  ],
  declarations: [HomeComponent, WorkersTasksComponent]
})
export class ManagerModule { }

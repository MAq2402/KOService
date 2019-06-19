import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ManagerRoutingModule } from './manager-routing.module';
import { SharedModule } from '../shared/shared.module';
import { WorkersTasksComponent } from './activity-manager/workers-tasks/workers-tasks.component';
import {MaterialModule} from '../shared/material/material.module';
import { ActivityCreatorComponent } from './activity-manager/activity-creator/activity-creator.component';
import { WorkersTableComponent } from './activity-manager/workers-table/workers-table.component';
import {RepairInfoComponent} from './activity-manager/repair-info/repair-info.component';
import { CommonModule } from '@angular/common';
import { AddRepairComponent } from './add-repair/add-repair.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PricingCreatorComponent } from './activity-manager/pricing-creator/pricing-creator.component';
@NgModule({
  imports: [
    SharedModule,
    ManagerRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [
    HomeComponent,
    WorkersTasksComponent,
    ActivityCreatorComponent,
    WorkersTableComponent,
    RepairInfoComponent,
    AddRepairComponent,
    PricingCreatorComponent
  ],
  entryComponents: [
    ActivityCreatorComponent,
  PricingCreatorComponent
]
})

export class ManagerModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AddEmployeeFormComponent } from './add-employee-form/add-employee-form.component';
import { RolePipe } from '../shared/pipes/role.pipe';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ],
  declarations: [HomeComponent, AddEmployeeFormComponent],
  providers: []
})
export class AdminModule { }

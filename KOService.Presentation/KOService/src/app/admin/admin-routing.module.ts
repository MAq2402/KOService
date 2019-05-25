import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AddEmployeeFormComponent } from './add-employee-form/add-employee-form.component';

const adminRoutes: Routes = [
    { path: '', component: HomeComponent },
    {path: 'add-employee', component: AddEmployeeFormComponent}
];

@NgModule({
  imports: [ RouterModule.forChild(adminRoutes) ],
  exports: [ RouterModule ]
})
export class  AdminRoutingModule {}

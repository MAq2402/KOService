import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClientLandingComponent } from './client-landing/client-landing.component';

const clientRoutes: Routes = [
  {path: ':number', component: HomeComponent},
  {path: '', component: ClientLandingComponent}

];

@NgModule({
  imports: [ RouterModule.forChild(clientRoutes) ],
  exports: [ RouterModule ]
})
export class  ClientRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ClientRoutingModule} from './client-routing.module';
import {MaterialModule} from '../shared/material/material.module';
import { ClientLandingComponent } from './client-landing/client-landing.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, ClientLandingComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    MaterialModule,
    FormsModule
  ],
  entryComponents: [HomeComponent]
})
export class ClientModule { }

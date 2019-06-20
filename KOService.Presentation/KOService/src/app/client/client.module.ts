import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ClientRoutingModule} from './client-routing.module';
import {MaterialModule} from '../shared/material/material.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    MaterialModule
  ],
  entryComponents: [HomeComponent]
})
export class ClientModule { }

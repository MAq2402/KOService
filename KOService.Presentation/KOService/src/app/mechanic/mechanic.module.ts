import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MechanicRoutingModule } from './mechanic-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    MechanicRoutingModule,
    SharedModule
  ],
  declarations: [HomeComponent]
})
export class MechanicModule { }

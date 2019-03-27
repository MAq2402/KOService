import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MechanicRoutingModule } from './mechanic-routing.module';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    MechanicRoutingModule,
    CoreModule
  ],
  declarations: [HomeComponent]
})
export class MechanicModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ManagerRoutingModule } from './manager-routing.module';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    ManagerRoutingModule,
    CoreModule
  ],
  declarations: [HomeComponent]
})
export class ManagerModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CoreContainerComponent } from './core-container/core-container.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CoreContainerComponent],
  exports: [
    CoreContainerComponent,
    HttpClientModule
  ]
})
export class CoreModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreContainerComponent } from './core-container/core-container.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CoreContainerComponent],
  exports: [CoreContainerComponent]
})
export class CoreModule { }

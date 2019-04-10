import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from './services/employee.service';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    BrowserAnimationsModule
  ],
  declarations: [],
  exports: [
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        EmployeeService
      ]
    };
  }
}

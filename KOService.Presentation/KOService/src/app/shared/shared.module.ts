import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from './services/employee.service';
import { 
  MatCardModule, MatInputModule, MatCheckboxModule
 } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule
  ],
  declarations: [],
  exports: [
    HttpClientModule,
    FormsModule,
    MatCardModule, MatInputModule, MatCheckboxModule
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

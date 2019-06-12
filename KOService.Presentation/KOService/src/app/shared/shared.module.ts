import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from './services/employee.service';
import { MaterialModule } from './material/material.module';
import { DateTimePipe } from './pipes/date-time.pipe';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { RolePipe } from './pipes/role.pipe';
@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule

  ],
  declarations: [DateTimePipe, ConfirmationComponent, RolePipe],
  exports: [
    MaterialModule,
    HttpClientModule,
    FormsModule,
    DateTimePipe,
    RolePipe,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [ConfirmationComponent]
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

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from './services/employee.service';
import { MaterialModule } from './material/material.module';
import { DateTimePipe } from './pipes/date-time.pipe';
import { VehicleService } from './services/vehicle.service';
import { ClientService } from './services/client.service';
@NgModule({
  imports: [
    MaterialModule,
    CommonModule
  ],
  declarations: [DateTimePipe],
  exports: [
    MaterialModule,
    HttpClientModule,
    FormsModule,
    DateTimePipe
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        EmployeeService,
        VehicleService,
        ClientService
      ]
    };
  }
}

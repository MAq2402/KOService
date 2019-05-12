import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from './services/employee.service';
import { MaterialModule } from './material/material.module';
import { DateTimePipe } from './pipes/date-time.pipe';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
@NgModule({
  imports: [
    MaterialModule,
    CommonModule,

  ],
  declarations: [DateTimePipe, ConfirmationComponent],
  exports: [
    MaterialModule,
    HttpClientModule,
    FormsModule,
    DateTimePipe
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

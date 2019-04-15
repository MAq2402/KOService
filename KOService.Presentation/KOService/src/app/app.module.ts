import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ManagerModule } from './manager/manager.module';
import { AddEmployeeFormComponent } from './admin/add-employee-form/add-employee-form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        AddEmployeeFormComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ManagerModule,
        SharedModule,
        CoreModule.forRoot(),
        AppRoutingModule,
        FormsModule,
    ],
    exports: [],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

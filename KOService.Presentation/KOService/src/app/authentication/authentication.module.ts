import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginService } from './services/login.service';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    CoreModule
  ],
  declarations: [LoginComponent],
  providers: [LoginService]
})
export class AuthenticationModule { }

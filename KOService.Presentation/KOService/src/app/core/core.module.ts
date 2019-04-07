import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreContainerComponent } from './core-container/core-container.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { AuthService } from '../authentication/services/auth.service';
import { NavbarComponent } from './navbar/navbar.component';
import { RolePipe } from '../shared/pipes/role.pipe';
import { NavbarButtonsComponent } from './navbar/navbar-buttons/navbar-buttons.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgbTooltipModule
  ],
  declarations: [CoreContainerComponent, NavbarComponent, RolePipe, NavbarButtonsComponent],
  exports: [
    CoreContainerComponent
  ]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        AuthService,
        RolePipe
      ]
    };
  }
 }

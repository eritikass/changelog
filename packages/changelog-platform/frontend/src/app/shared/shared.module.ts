import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

// Interceptors
import { TimingInterceptor } from './interceptors/timing.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ErrorInterceptor } from '@shared/interceptors/error.interceptor';

// External Modules
import { ExternalModule } from '@shared/modules/external.module';

// pipes
import { PipesModule } from '@shared/pipes/pipe.module';

import { HubService } from '@core/services/hub.service';


const MODULES = [
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  ExternalModule,
  PipesModule,
  HttpClientModule
];

@NgModule({
  imports: MODULES,
  exports: MODULES
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        // { provide: HTTP_INTERCEPTORS, useClass: TimingInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true, deps: [HubService] }
      ],
    };
  }
}

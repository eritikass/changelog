import { NgModule, Optional, SkipSelf } from '@angular/core';

import { ToastrModule } from 'ngx-toastr';

import { SharedModule } from '@shared/shared.module';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { ComponentsModule } from '@core/components/components.module';

import { GithubService } from '@core/services/github.service';
import { HubService } from '@core/services/hub.service';
import { AuthGuard } from '@core/guards/auth.guard';


@NgModule({
  imports: [
    ComponentsModule,
    SharedModule.forRoot(),
    ToastrModule.forRoot(),
  ],
  exports: [ComponentsModule],
  providers: [
    GithubService,
    HubService,
    AuthGuard
  ],
  declarations: []
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}

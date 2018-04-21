import { NgModule, Optional, SkipSelf } from '@angular/core';

import { ToastrModule } from 'ngx-toastr';

import { SharedModule } from '@shared/shared.module';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { ComponentsModule } from '@core/components/components.module';

import { GithubService } from '@core/services/github.service';

@NgModule({
  imports: [
    SharedModule,
    ComponentsModule,
    ToastrModule.forRoot(),
  ],
  exports: [ComponentsModule],
  providers: [

    GithubService
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

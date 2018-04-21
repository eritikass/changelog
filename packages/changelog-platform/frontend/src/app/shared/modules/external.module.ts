import { NgModule } from '@angular/core';

// import {
//   HammerGestureConfig,
//   HAMMER_GESTURE_CONFIG
// } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import * as Hammer from 'hammerjs';

// custom modules
import { HighchartslModule } from '@shared/modules/highcharts.module';
import { MaterialModule } from '@shared/modules/material.module';

// external modules
import { ToastrModule } from 'ngx-toastr';


export const MODULES = [
    FlexLayoutModule,
    HighchartslModule,
    MaterialModule,
];

// export class MyHammerConfig extends HammerGestureConfig {
//   overrides = <any>{
//     swipe: { direction: Hammer.DIRECTION_ALL }
//   };
// }

@NgModule({
    imports: MODULES,
    exports: MODULES,
})
export class ExternalModule {

}

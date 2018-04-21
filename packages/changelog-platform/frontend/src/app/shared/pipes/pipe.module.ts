import { NgModule } from '@angular/core';

import { AntiCamelPipe } from '@shared/pipes/anti-camel.pipe';
import { PercentageBarPipe } from '@shared/pipes/percentage-bar.pipe';
import { LongTextPipe } from '@shared/pipes/long-text.pipe';

export const PIPES = [AntiCamelPipe, PercentageBarPipe, LongTextPipe];

@NgModule({
    declarations: PIPES,
    exports: PIPES,
})
export class PipesModule { }

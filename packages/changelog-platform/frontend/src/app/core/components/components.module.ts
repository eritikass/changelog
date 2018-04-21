import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';


// @layouts
import { NavComponent } from './@layouts/nav/nav.component';


export const COMPONENTS = [
    NavComponent
];

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS,
})
export class ComponentsModule { }

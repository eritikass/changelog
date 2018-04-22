import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';


// @layouts
import { NavComponent } from './@layouts/nav/nav.component';
import { FooterComponent } from './@layouts/footer/footer.component';

export const COMPONENTS = [
    NavComponent,
    FooterComponent
];

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS,
})
export class ComponentsModule { }

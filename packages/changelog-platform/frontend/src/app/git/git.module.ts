import { NgModule } from '@angular/core';

import { RoutingModule } from './routing.module';
import { SharedModule } from '@shared/shared.module';

import { GitComponent } from './git.component';
import { AuthComponent } from './auth/auth.component';
import { ReposComponent } from './repos/repos.component';
// import { DeviceListComponent } from './device-list/device-list.component';
// import { MessagesComponent } from './messages/messages.component';

@NgModule({
    imports: [
        RoutingModule,
        SharedModule
    ],
    declarations: [
        GitComponent,
        AuthComponent,
        ReposComponent
    ]
})
export class GitModule { }

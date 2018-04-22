import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GitComponent } from './git.component';

import { AuthComponent } from './auth/auth.component';
import { ReposComponent } from './repos/repos.component';
import { AuthGuard } from '@core/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: GitComponent,
        children: [
            { path: '', redirectTo: 'auth', pathMatch: 'full' },
            { path: 'auth', component: AuthComponent },
            { path: 'repos', component: ReposComponent, canActivate: [AuthGuard] }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RoutingModule { }

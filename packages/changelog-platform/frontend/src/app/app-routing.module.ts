import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';


import { AppConfig } from './config/app.config';
import { AppComponent } from './app.component';



const routes: Routes = [
  // { path: '', component: AppComponent },
  // { path: '', redirectTo: 'auth', pathMatch: 'full' },
  // { path: 'auth', component: AuthComponent },
  // { path: 'reg', component: RegComponent },

  {
    path: '',
    loadChildren: 'app/git/git.module#GitModule',
  },
  // { path: AppConfig.routes.error404, component: Error404Component },

  // otherwise redirect to 404
  // { path: '**', redirectTo: '/' + AppConfig.routes.error404 }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    // {
    //   preloadingStrategy: PreloadAllModules
    // }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }

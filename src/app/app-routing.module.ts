import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { FullLayoutComponent } from './layouts/full/full-layout.component';
import { Full_ROUTES } from './shared/routes/full-layout.routes';
import {TranslateModule} from '@ngx-translate/core';
import {CONTENT_ROUTES} from './shared/routes/content-layout.routes';
import {AuthGuard} from './shared/auth/auth-guard.service';
import {ContentLayoutComponent} from './layouts/content/content-layout.component';

const appRoutes: Routes = [
  { path: '', component: FullLayoutComponent, data: { title: 'full Views' }, children: Full_ROUTES, canActivate: [AuthGuard]},
  { path: '', component: ContentLayoutComponent, data: { title: 'content Views' }, children: CONTENT_ROUTES, canDeactivate: [AuthGuard]},
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' }), TranslateModule],
  exports: [RouterModule]
})

export class AppRoutingModule {
}

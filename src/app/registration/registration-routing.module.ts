import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../auth/auth.guard';
import {AppLayoutComponent} from '../_layout/app-layout.component';
import { RegistrationComponent } from './registration.component';
import { AppLayoutSlimComponent } from '../_layout/app-layout-slim.component';


const routes: Routes = [
  {
    path: '',
    // canActivate: [],
    // canActivateChild: [],
    // wrap this in the app layout component, which provides the nav + header + footer
    component: AppLayoutSlimComponent,
    children: [
      {path: 'register', component: RegistrationComponent },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule {
}
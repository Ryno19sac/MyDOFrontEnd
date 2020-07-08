import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found.component';
import {AppLayoutComponent} from "../_layout/app-layout.component";
import { AppLayoutSlimComponent } from '../_layout/app-layout-slim.component';

const routes: Routes = [
  // everything else that is protected and within the full layout
  {
    path: '',
    // wrap this in the app layout component, which provides the nav + header + footer
    component: AppLayoutSlimComponent,
    children: [
      { path: '**', component: PageNotFoundComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageNotFoundRoutingModule {}

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../auth/auth.guard';
import {AppLayoutComponent} from '../_layout/app-layout.component';
import {OrganizationsComponent} from './organizations.component';
import {OrganizationComponent} from './organization.component';
import {RoleGuard} from "../auth/role.guard";
import {OrganizationNewComponent} from "./organization-new.component";
import {OrganizationEditComponent} from "./organization-edit.component";

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    // canActivateChild: [RoleGuard],
    // data: {isAdminPage: true},
    // wrap this in the app layout component, which provides the nav + header + footer
    component: AppLayoutComponent,
    children: [
      {path: 'organizations', component: OrganizationsComponent},
      {path: 'organizations/new', component: OrganizationNewComponent},
      {path: 'organizations/:organizationId', component: OrganizationComponent},
      {path: 'organizations/:organizationId/edit', component: OrganizationEditComponent, data: {roles: ['hasOrganizationEdit']}},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationsRoutingModule {
}

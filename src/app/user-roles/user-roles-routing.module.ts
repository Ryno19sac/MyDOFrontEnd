import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../auth/auth.guard';
import {UserRolesComponent} from './user-roles.component';
import {UserRoleComponent} from './user-role.component';
import {UserRoleNewComponent} from './user-role-new.component';
import {UserRoleEditComponent} from './user-role-edit.component';
import {RoleGuard} from "../auth/role.guard";
import {AppLayoutComponent} from "../_layout/app-layout.component";

const routes: Routes = [
  // everything else that is protected and within the full layout
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [RoleGuard],
    data: {isAdminPage: true},
    // wrap this in the app layout component, which provides the nav + header + footer
    component: AppLayoutComponent,
    children: [
      {path: 'user-roles', component: UserRolesComponent, data: {roles: ['hasUserRoleView']}},
      {path: 'user-roles/new', component: UserRoleNewComponent, data: {roles: ['hasUserRoleCreate']}},
      {path: 'user-roles/:id', component: UserRoleComponent, data: {roles: ['hasUserRoleView']}},
      {
        path: 'user-roles/:id/edit',
        component: UserRoleEditComponent,
        data: {roles: ['hasUserRoleView', 'hasUserRoleEdit']}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRolesRoutingModule {
}

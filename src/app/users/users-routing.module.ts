import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../auth/auth.guard';
import {AppLayoutComponent} from '../_layout/app-layout.component';
import {UsersComponent} from './users.component';
import {UserComponent} from './user.component';
import {UserNewComponent} from './user-new.component';
import {UserEditComponent} from './user-edit.component';
import {RoleGuard} from '../auth/role.guard';

const routes: Routes = [
    // everything else that is protected and within the full layout
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [],
        data: {isAdminPage: true},
        // wrap this in the app layout component, which provides the nav + header + footer
        component: AppLayoutComponent,
        children: [
            {path: 'users', component: UsersComponent, data: {roles: ['hasUserView']}, canActivate: [RoleGuard]},
            {
                path: 'users/new',
                component: UserNewComponent,
                data: {roles: ['hasUserCreate']},
                canActivate: [RoleGuard]
            },
            {path: 'users/:userId', component: UserComponent, data: {roles: ['hasUserView']}, canActivate: [RoleGuard]},
            {
                path: 'users/:userId/edit',
                component: UserEditComponent,
                data: {roles: ['hasUserView', 'hasUserEdit']},
                canActivate: [RoleGuard]
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule {
}

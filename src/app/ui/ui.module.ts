import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {DeleteConfirmDialogComponent} from './delete-confirm-dialog.component';
import {UserBreadcrumbComponent} from './user-breadcrumb.component';
import {UserRoleBreadcrumbComponent} from './user-role-breadcrumb.component';
import { OrganizationBreadcrumbComponent } from './organization-breadcrumb.component';


@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        
        UserBreadcrumbComponent,
        UserRoleBreadcrumbComponent,
        DeleteConfirmDialogComponent,
        OrganizationBreadcrumbComponent,
        
    ],
    exports: [
        
        UserBreadcrumbComponent,
        UserRoleBreadcrumbComponent,
        DeleteConfirmDialogComponent,
        OrganizationBreadcrumbComponent
        
    ],
    providers: []
})
export class UIModule {
}

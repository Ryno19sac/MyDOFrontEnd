import {NgModule} from '@angular/core';
import {UserRolesComponent} from './user-roles.component';
import {UserRolesRoutingModule} from './user-roles-routing.module';
import {UserRoleComponent} from './user-role.component';
import {UserRoleNewComponent} from './user-role-new.component';
import {UserRoleEditComponent} from './user-role-edit.component';
import {SharedModule} from "../shared/shared.module";
import {UserRoleService} from "./user-role.service";
import {UIModule} from "../ui/ui.module";

@NgModule({
  imports: [
    // import all the shared stuff
    SharedModule,
    UIModule,
    // import the routing for this module
    UserRolesRoutingModule
  ],
  declarations: [
    UserRoleComponent,
    UserRoleEditComponent,
    UserRoleNewComponent,
    UserRolesComponent
  ],
  exports: [
    UserRoleComponent
  ],
  providers: [
    UserRoleService
  ]
})
export class UserRolesModule {
}

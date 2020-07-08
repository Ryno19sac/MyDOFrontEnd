import {NgModule} from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {UsersComponent} from './users.component';
import {UsersRoutingModule} from './users-routing.module';
import {UserComponent} from './user.component';
import {UserService} from "./user.service";
import {UserEditComponent} from "./user-edit.component";
import {UserNewComponent} from "./user-new.component";
import {UserRolesModule} from "../user-roles/user-roles.module";
import {UIModule} from "../ui/ui.module";

@NgModule({
  imports: [
    // import all the shared stuff
    SharedModule,
    UserRolesModule,
    UIModule,
    // import the routing for this module
    UsersRoutingModule
  ],
  declarations: [
    UserComponent,
    UserEditComponent,
    UserNewComponent,
    UsersComponent
  ],
  providers: [UserService]
})
export class UsersModule {}

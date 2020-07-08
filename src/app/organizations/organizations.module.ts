import {NgModule} from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {OrganizationsRoutingModule} from "./organizations-routing.module";
import {OrganizationService} from "./organization.service";
import {OrganizationComponent} from "./organization.component";
import {OrganizationsComponent} from "./organizations.component";
import {UIModule} from "../ui/ui.module";
import {OrganizationNewComponent} from "./organization-new.component";
import {OrganizationEditComponent} from "./organization-edit.component";

@NgModule({
    imports: [
        // import all the shared stuff
        SharedModule,
        UIModule,
        // import the routing for this module
        OrganizationsRoutingModule,
    ],
  declarations: [
    OrganizationComponent,
    OrganizationNewComponent,
    OrganizationEditComponent,
    OrganizationsComponent
  ],
  providers: [OrganizationService]
})
export class OrganizationsModule {}

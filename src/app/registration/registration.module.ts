import {NgModule} from '@angular/core';
import {SharedModule} from "../shared/shared.module";

import {UIModule} from "../ui/ui.module";
import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './registration.component';
import { RegistrationService } from './registration.service';


@NgModule({
    imports: [
        // import all the shared stuff
        SharedModule,
        UIModule,
        // import the routing for this module
        RegistrationRoutingModule
    ],
  declarations: [
        RegistrationComponent
  ],
  providers: [RegistrationService]
})
export class RegistrationModule {}

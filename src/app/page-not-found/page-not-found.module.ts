import {NgModule} from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {PageNotFoundComponent} from './page-not-found.component';
import {PageNotFoundRoutingModule} from './page-not-found-routing.module';

@NgModule({
  imports: [
    // import all the shared stuff
    SharedModule,
    // import the routing for this module
    PageNotFoundRoutingModule
  ],
  declarations: [
    PageNotFoundComponent
  ],
})
export class PageNotFoundModule {}

import {Component} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {GlobalState} from "../+state/global.interfaces";
import {Environment} from "../shared/environment";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {

  constructor(
      private environment: Environment,
      private route: ActivatedRoute,
      public authService: AuthService,
      private router: Router,
      private store: Store<GlobalState>,
      private snackBar: MatSnackBar) {

    // // check for an organization in the url
    // if(this.route.snapshot.paramMap.has('organizationId')) {
    //   // grab it and look it up
    //   const organizationId = +this.route.snapshot.paramMap.get('organizationId');
    //   // Get the public organization information by the id
    //   this.organizationService.getOrganizationPublic(organizationId).subscribe(organization => {
    //     // save it
    //     // put it in the store
    //     this.store.dispatch(new OrganizationUpdatedAction(organization));
    //     // put it in local storage so it stays put for a while
    //     localStorage.setItem(AuthService.AUTH_ORGANIZATION_OBJECT, JSON.stringify(organization));
    //   });
    // }
  }
}

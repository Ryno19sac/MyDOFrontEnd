import {Component, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthService} from "../auth/auth.service";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {Store} from "@ngrx/store";
import {User} from "../users/user";
import {GlobalState} from "../+state/global.interfaces";
import { MatSidenav } from "@angular/material/sidenav";
import {ActivatedRoute} from '@angular/router';
import {OrganizationUpdatedAction, UserUpdatedAction} from '../+state/global.actions';
import {OrganizationService} from '../organizations/organization.service';

@Component({
  selector: 'MyDO-app-layout',
  templateUrl: './app-layout.component.html',
  // styleUrls: ['./styles.scss']


})
export class AppLayoutComponent {

  // the menu
  @ViewChild(MatSidenav, {static: true}) sidenav: MatSidenav;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  // the current user;
  user: User;

  constructor(public authService: AuthService,
              private _route: ActivatedRoute,
              private breakpointObserver: BreakpointObserver,
              private sanitizer: DomSanitizer,
              private iconRegistry: MatIconRegistry,
              private organizationService: OrganizationService,
              private store: Store<GlobalState>) {

    
  }

  navToggle(): void{
    this.sidenav.toggle();
  }
}

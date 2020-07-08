import {Component, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {Store} from '@ngrx/store';
import {User} from '../users/user';
import {GlobalState} from '../+state/global.interfaces';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
    selector: 'app-layout-slim',
    templateUrl: './app-layout-slim.component.html',
    // styleUrls: ['./styles.scss']

})

export class AppLayoutSlimComponent {

    // the menu
    @ViewChild(MatSidenav, {static: true}) sidenav: MatSidenav;

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches)
        );

    // the current user;
    user: User;

    constructor(public authService: AuthService,
                private breakpointObserver: BreakpointObserver,
                private sanitizer: DomSanitizer,
                private iconRegistry: MatIconRegistry,
                private store: Store<GlobalState>) {

        // create the icon registry for faster loading
        this.iconRegistry.addSvgIcon('biblioveda_logo', sanitizer.bypassSecurityTrustResourceUrl('assets/biblioveda.svg'));
        this.iconRegistry.addSvgIcon('stripe_logo_slate', sanitizer.bypassSecurityTrustResourceUrl('assets/stripe_logo_slate.svg'));

        // set the user
        store.select('app').subscribe(state => {
            this.user = state.user;
        });
    }

    navToggle(): void {
        this.sidenav.toggle();
    }
}

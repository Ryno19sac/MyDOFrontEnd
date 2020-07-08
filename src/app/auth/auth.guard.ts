import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import {Store} from '@ngrx/store';
import {GlobalState} from '../+state/global.interfaces';
import {AdminPageOffAction, AdminPageOnAction} from '../+state/global.actions';
import {Organization} from '../organizations/organization';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild 
{

    

    constructor(private authService: AuthService, private router: Router, private theStore: Store<GlobalState>) {
        // subscribe to store updates
        
    }
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
        throw new Error("Method not implemented.");
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
        throw new Error("Method not implemented.");
    }

    // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //     const url: string = state.url;
    //     // console.log("checking route", route);
    //     // console.log("checking state", state);
    //     console.log('checking route', route);
    //     // grab the admin page status from the route
    //     if ('isAdminPage' in route.data && route.data['isAdminPage'] === true) {
    //         console.log('isAdminPage is true: ', route.data['isAdminPage']);
    //         // update the local stored variable
    //         this.onAdminPage = true;
    //         // dispatch and update to the store
    //         this.theStore.dispatch(new AdminPageOnAction());
    //     } else {
    //         console.log('isAdminPage is false or not set: ', route.data['isAdminPage']);
    //         // update the local stored variable
    //         this.onAdminPage = false;
    //         // indicate we are not on the store
    //         this.theStore.dispatch(new AdminPageOffAction());
    //     }

    //     // if they are logged in, no need to do anything
    //     // and make sure they are specifically not a patron
    //     if (!this.authService.isAuthenticated()) {
    //         // Store the attempted URL for redirecting
    //         this.authService.redirectUrl = url;
    //         // send to login screen
    //         this.router.navigate(['/login']);
    //         return false;
    //     }
    //     if (!this.authService.user) {
    //         // this is a scenario that shouldn't happen,
    //         // but let's try to fix it by logging them out
    //         // Store the attempted URL for redirecting
    //         this.authService.redirectUrl = url;
    //         // send to login screen
    //         this.router.navigate(['/logout']);
    //         return false;
    //     }
    //     // quick out for super users
    //     if (this.authService.user.superUser) {
    //         return true;
    //     }
    //     //
    //     if (this.authService.isAuthenticated() && this.authService.user) {
    //         // verify that they have completed email and sms validation
    //         if(!this.authService.user.emailVerified || !this.authService.user.mobileNumberVerified) {
    //             console.log("verification not completed. redirecting to verification workflow");
    //             // send to login screen
    //             this.router.navigate(['/verification']);
    //             return false;
    //         }
    //         return true;
    //     }
    //     // nope
    //     return false;
    // }

    // canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //     console.log('checking child route', route);
    //     // check permissions on the route
    //     return this.canActivate(route, state);
    // }
}


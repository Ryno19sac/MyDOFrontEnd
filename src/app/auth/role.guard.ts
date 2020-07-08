import {Injectable} from "@angular/core";
// import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from "@angular/router";
// import {Store} from "@ngrx/store";
// import { MatSnackBar } from "@angular/material/snack-bar";
// import {AuthService} from "../auth/auth.service";
// import {Organization} from "../organizations/organization";
// import {GlobalState} from "../+state/global.interfaces";
// import {Environment} from "../shared/environment";

@Injectable()
export class RoleGuard {}
// implements CanActivate, CanActivateChild {

    // private organization: Organization;
    // private onAdminPage: boolean;

    // constructor()private environment: Environment,
    //             private authService: AuthService,
    //             private router: Router,
    //             private snackBar: MatSnackBar,
    //             private theStore: Store<GlobalState>) {
    //     // subscribe to store updates
    //     theStore.select("app").subscribe(state => {
    //         // get the organization
    //         this.organization = state.organization;
    //         this.onAdminPage = state.adminPage;
    //     });
    // }

    // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //     const url: string = state.url;
    //     // console.log("checking route", route);
    //     // console.log("checking state", state);
    //     console.log("checking url", url);
    //     console.log("checking route", route);
    //     console.log("checking route data", route.data);

    //     // console.log("this.authService.isAuthenticated() is", this.authService.isAuthenticated());
    //     // if they are logged in, no need to do anything
    //     // and make sure they are specifically not a patron
    //     if (!this.authService.isAuthenticated()) {
    //         // Store the attempted URL for redirecting
    //         this.authService.redirectUrl = url;
    //         // send to login screen
    //         this.router.navigate(["/login"]);
    //         return false;
    //     }
    //     if (!this.authService.user) {
    //         // this is a scenario that shouldn"t happen,
    //         // but let"s try to fix it by logging them out
    //         // Store the attempted URL for redirecting
    //         this.authService.redirectUrl = url;
    //         // send to login screen
    //         this.router.navigate(["/logout"]);
    //         return false;
    //     }
    //     // quick out for super users
    //     console.log("super user status", this.authService.user.superUser);
    //     if (this.authService.user.superUser) {
    //         return true;
    //     }
    //     // grab the roles from the route - moved up here to make sure we have it for gale admin check
    //     const requiredRoles = route.data["roles"] as string[];
    //     // check permissions on the route
    //     return this.checkRoles(requiredRoles);
    // }

    // canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //     return this.canActivate(route, state);
    // }

    // checkRoles(requiredRoles: string[]): boolean {
    //     console.log("checking for required roles", requiredRoles);
    //     // quick out
    //     if (!requiredRoles || requiredRoles.length === 0) {
    //         console.log("no roles are required");
    //         return true;
    //     }
    //     // if there is no user then no chance of auth
    //     if(!this.authService.user) {
    //         // let the use know when
    //         this.snackBar.open("Access Denied", null, {
    //             panelClass: ["snackbar-error"],
    //             horizontalPosition: "center",
    //             verticalPosition: "top",
    //             duration: this.environment.snackBarTimeout
    //         });

    //     }
    //     // else, extract the user claims
    //     const claims = this.authService.user.claims;
    //     // sanity check
    //     if (!claims) {
    //         console.log("no claims found for user ", this.authService.user);
    //         return false;
    //     }
    //     // loop the required roles
    //     for (const role of requiredRoles) {
    //         console.log("required role is", role);
    //         // check if this user has this role
    //         if (claims[role] === 1) {
    //             console.log("required role is TRUE");
    //         } else {
    //             console.log("required role is FALSE");
    //             // let the use know when
    //             this.snackBar.open("Access Denied", null, {
    //                 panelClass: ["snackbar-error"],
    //                 horizontalPosition: "center",
    //                 verticalPosition: "top",
    //                 duration: this.environment.snackBarTimeout
    //             });
    //             return false;
    //         }
    //     }
    //     // if we get here, then we are ok
    //     return true;
    // }
// }

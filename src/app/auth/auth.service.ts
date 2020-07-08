import {BehaviorSubject, Observable, of, throwError} from "rxjs";

import {catchError, map, mergeMap, retryWhen, take, tap} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {User} from "../users/user";
import {Environment} from "../shared/environment";
import {UserService} from "../users/user.service";
import {GlobalState} from "../+state/global.interfaces";
import {OrganizationUpdatedAction, UserUpdatedAction} from "../+state/global.actions";
import {AuthResponse} from "../shared/model";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Organization} from "../organizations/organization";
import {OrganizationService} from '../organizations/organization.service';
import { Registration } from '../registration/registration';
import { UserRegistration } from '../registration/user-registration';

/** authentication is a two step process
 *
 * 1) first hit the login end point, which will give use a JWT token
 * 2) if successful, look up the user profile information with said token
 * 3) store it all in local storage
 */
@Injectable()
export class AuthService {

    constructor(
        private environment: Environment,
        private http: HttpClient,
        private jwtHelperService: JwtHelperService,
        private userService: UserService,
        private store: Store<GlobalState>,
        private router: Router,
    ) {
        // If authenticated, set local profile property and update login status subject
        // if (this.isAuthenticated()) {
        //     this.user = JSON.parse(localStorage.getItem(AuthService.AUTH_USER_OBJECT));
        //     this.setLoggedIn(true);
        // }
    }

    public static AUTH_TOKEN = "myDO_access_token";
    public static AUTH_USER_OBJECT = "myDO_user";
    

    private headers = new HttpHeaders({"Content-Type": "application/json"});

    // Create a stream of logged in status to communicate throughout app
    loggedIn: boolean;
    loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);

    // this is the user object
    user: User;

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    public static decodeClaims(encodedClaims: any): any {
        console.log("decoding the claims", encodedClaims);
        // little helper for random auth issues
        if (!encodedClaims || encodedClaims.length === 0) {
            console.log("claims are empty, leaving");
            return {};
        }
        // the return object
        const claims = {};
        // loop all the claims
        encodedClaims.forEach((value: string, key: string) => {
        // for (const claim in encodedClaims) {
            console.log("the claim key is ", key);
            console.log("the claim value is ", value);
            // stripe the ROLE_ which comes down from the server side
            if (value.startsWith("ROLE_")) {
                console.log("stripping role and setting to ", value.substring(5, value.length));
                // strip the prefix and set it
                claims[value.substring(5, value.length)] = 1;
            } else {
                // set the claim straight away
                claims[value] = 1;
            }
        });
        // return them
        return claims;
    }

    // --
    setLoggedIn(value: boolean) {
        // Update login status subject
        this.loggedIn$.next(value);
        this.loggedIn = value;
    }

    // --
    logout() {
        // Remove tokens and profile and update login status subject
        localStorage.removeItem(AuthService.AUTH_TOKEN);
        localStorage.removeItem(AuthService.AUTH_USER_OBJECT);
        this.user = undefined;
        this.setLoggedIn(false);
        // Yes? this.router.navigate(["/"]);
    }

    loginUser(email: string, password: string): Observable<User> {
        const url = `${this.environment.loginUrl}`;
        console.log('url', url)
        console.log(`${email} trying to log in with password`);
        // clear the saved tokens just in case
        this.logout();
        // build the login object
        const saveRegistration: Registration = {
            username: email,
            password: password
        };
        const loginObject: UserRegistration = {
            user: saveRegistration
        }
        return this.http
            .post(url, JSON.stringify(loginObject), {headers: this.headers})
            .pipe(
                map((response: UserRegistration) => {
                    console.log("response is", response);
                    // get the bearer token
                    const authString: string = response.jwt;
                    // santy check
                    console.log("jwt is", authString);

                    if (!authString) {
                        console.log("jwt is empty");
                        return null;
                    }
                    const user: User = {
                        id: response.user.id,
                        username: response.user.username,
                        password: response.user.password
                    }
                    // create the auth result
                    const authResponse = new AuthResponse(authString, 0, "aurora");
                    // set the session
                    this._setSession(authResponse, user);
                    return user;
                }),
                tap(user => console.log("fetched user", user)),
                retryWhen(errors => {
                    console.log("in retryWhen, checking the error", errors);
                    return errors.pipe(
                        mergeMap(error => {
                            console.log("error MergeMap", error);
                            // if the error is access denied, just bail and don"t retry
                            if (error.status === 403 || error.status === 401) {
                                console.log("status is access denied. throwing");
                                return throwError(error);
                            } else {
                                console.log("not an ACCESS DENIED error. status is", error.status);
                                return of(error);
                            }
                        }),
                        take(3)
                    );
                }),
                catchError(err => throwError("throwing from catch!"))
            );
    }

    // // --
    private _setSession(authResult: AuthResponse, user: User) {
        console.log("setting up user session");
        
        const expTime = authResult.expiresIn * 1000 + Date.now();
        // Save session data and update login status subject
        localStorage.setItem(AuthService.AUTH_TOKEN, authResult.accessToken);
        localStorage.setItem(AuthService.AUTH_USER_OBJECT, JSON.stringify(user));
        // localStorage.setItem(AuthService.AUTH_EXPIRES_AT, JSON.stringify(expTime));
        this.user = user;
        this.setLoggedIn(true);
    }

    // // --
    public isAuthenticated(): boolean {
        // check for a token
        if (this.jwtHelperService.tokenGetter()) {
            // get the token

            return !this.jwtHelperService.isTokenExpired(this.jwtHelperService.tokenGetter(), 0);
        }
        // else it"s definitely false
        return false;
    }

    // public isAtLeastUserType(type: string) {
    //     // quick out
    //     if (this.isSuperUser()) {
    //         return true;
    //     }
    //     // no permissions
    //     return true;
    // }

    // public isAtLeastOrganizationType(type: string) {
    //     // quick out
    //     if (this.isSuperUser()) {
    //         return true;
    //     }
    //     // no permissions
    //     return true;
    // }

    // public hasPermissions(permissions: string[]) {
    //     // console.log("checking permissions on array", permissions);
    //     // iterate them all
    //     for (let j = 0; j < permissions.length; j++) {
    //         // check the permission
    //         const granted = this.hasPermission(permissions[j]);
    //         // if false, immediately fail
    //         if (!granted) {
    //             return false;
    //         }
    //     }
    //     // default to true. this is the case where there where no permissions passed in
    //     // and none of the permission checks failed
    //     return true;
    // }

    // public hasPermission(permission: string) {
    //     // quick outs
    //     if (!this.user) {
    //         // no user
    //         return false;
    //     }

    //     if (!this.isAuthenticated()) {
    //         // no user
    //         return false;
    //     // }
    //     // if (this.isSuperUser()) {
    //     //     console.log("user is SUPER USER so providing full access!");
    //     //     return true;
    //     // }
    //     // one more sanity check
    // //     if (!this.user.claims || Object.keys(this.user.claims).length === 0) {
    // //         console.log("user has no attached claims");
    // //         return false;
    // //     }
    // //     // return the value of the permission
    // //     return this.user.claims[permission] === 1;
    // // }

    // // public isSuperUser(): boolean {
    // //     return this.isAuthenticated() && this.user && this.user.superUser;
    // // }
}

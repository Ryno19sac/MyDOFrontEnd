import {Observable, of, throwError as observableThrowError} from "rxjs";
import {Injectable} from "@angular/core";
import {User} from "./user";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from "@angular/common/http";
import {catchError, map, mergeMap, retryWhen, tap} from "rxjs/operators";
import {Environment} from "../shared/environment";
import {AuthResponse, ResponseBase} from "../shared/model";

const headers = new HttpHeaders({"Content-Type": "application/json"});

@Injectable()
export class UserService {
    users: User[] = [];

    constructor(private environment: Environment,
                private http: HttpClient) {
    }

    /** GET users from the server */
    listUsers(organizationId: number, page: number, limit: number): Observable<ResponseBase<User[]>> {
        return this.http.get<ResponseBase<User[]>>(
            `${this.environment.apiUrl}/users?page=${page}&limit=${limit}`,
            { headers: headers }
        );
    }

    /** GET user by id. Will 404 if id not found */
    getUser(organizationId: number, userId: number): Observable<User> {
        const url = `${this.environment.apiUrl}/organizations/${organizationId}/users/${userId}`;
        return this.http.get<User>(url, {headers: headers}).pipe(
            tap(_ => console.log(`fetched user id=${userId}`)),
            catchError(err => observableThrowError(err))
        );
    }

    checkforEmail(email: string): Observable<boolean> {
        const url = `${this.environment.apiUrl}/users/email/check?email=${ encodeURIComponent(email) }`;
        return this.http.get<boolean>(url, {headers: headers}).pipe(
            map((result: boolean) => {
                console.log("got email check result", result);
                return result;
            }),
            catchError(err => {
                return observableThrowError(err);
            })
        );
    }

    /** GET user by id. Will 404 if id not found */
    getUserFromAuth(authResponse: AuthResponse): Observable<User> {
        const url = `${this.environment.apiUrl}/userinfo`;

        console.log("trying to get profile with auth", authResponse);

        return this.http
            .get<User>(url, {
                // this is normally automatically in our http calls, but at this juncture it hasn"t been
                // save yet so we need to put it in manually
                // this makes the login + user retrieval an atomic operation, in a sense
                headers: new HttpHeaders({
                    "Authorization": `Bearer ${authResponse.accessToken}`,
                    "Content-Type": "application/json"
                }),
            }).pipe(
                tap(user => console.log("fetched user", user)),
                retryWhen(errors => {
                    let count = 0;
                    console.log("got errors fetching user user in user service", errors);
                    console.log("retry count is", count);
                    return errors.pipe(
                        mergeMap((error: HttpErrorResponse) => {
                            console.log("mergeMap retry count is", count);
                            if (++count >= 3) {
                                console.log("mergeMap count exceeded");
                                // just throw it
                                return observableThrowError(error);
                            }
                            // check the error code.
                            // TODO: change this to check known codes that are possible to recover from
                            // if we throw then we stop processing
                            // otherwise we retry (HttpClient default is 3)
                            if (error.status === 500) {
                                return observableThrowError(error);
                            } else if (error.status === 403) {
                                return observableThrowError(error);
                            } else if (error.status === 404) {
                                return observableThrowError(error);
                            } else {
                                return of(error);
                            }
                        })
                    );
                })
            );
    }

    //////// password reset /////////

    requestUserPassword(email: string): Observable<string> {
        // tack the u_ on the username so the server can tell where this is coming from
        return this.http
            .post<string>(`${this.environment.apiUrl}/password/request?email=${email}`, null, {headers: headers})
            .pipe(catchError(err => observableThrowError(err)));
    }

    resetUserPassword(user: User): Observable<ResponseBase<User>> {
        const url = `${this.environment.apiUrl}/users/${user.id}/password/change`;
        return this.http.post<ResponseBase<User>>(url, JSON.stringify(user), {headers: headers}).pipe(
            map((result: ResponseBase<User>) => result),
            tap(result => console.log("got user with updated password", result)),
            retryWhen(err => {
                console.log("in retryWhen, checking the error", err);
                throw err;
            }),
            catchError(err => observableThrowError(err))
        );
    }

    getUserFromResetToken(token: string): Observable<User> {
        // look up the user based on the reset token
        return this.http.get<User>(`${this.environment.apiUrl}/users/reset-token?token=${token}`, {headers: headers}).pipe(
            map((response: User) => {
                // return the user
                return response;
            }),
            catchError(err => observableThrowError(err))
        );
    }

    updateUserPassword(id: number, password: string): Observable<User> {
        return this.http.put<User>(`${this.environment.apiUrl}/users/${id}/password`, JSON.stringify(password), {headers: headers}).pipe(
            map((response: User) => {
                return response;
            }),
            catchError(err => observableThrowError(err))
        );
    }

    //////// CRUD methods //////////

    create(organizationId: number, user: User): Observable<ResponseBase<User>> {
        const url = `${this.environment.apiUrl}/organizations/${organizationId}/users`;
        return this.http.post(url, JSON.stringify(user), {headers: headers}).pipe(
            map((response: ResponseBase<User>) => response),
            tap(response => console.log("got created response", response)),
            retryWhen(err => {
                console.log("in retryWhen, checking the error", err);
                throw err;
            }),
            catchError(err => observableThrowError(err))
        );
    }

    update(organizationId: number, user: User): Observable<ResponseBase<User>> {
        const url = `${this.environment.apiUrl}/organizations/${organizationId}/users/${user.id}`;
        return this.http.put(url, JSON.stringify(user), {headers: headers}).pipe(
            map((result: ResponseBase<User>) => result),
            tap(result => console.log("got created user", result)),
            retryWhen(err => {
                console.log("in retryWhen, checking the error", err);
                throw err;
            }),
            catchError(err => observableThrowError(err))
        );
    }

    delete(organizationId: number, user: User): Observable<User> {
        const url = `${this.environment.apiUrl}/organizations/${organizationId}/users/${user.id}`;
        return this.http.delete(url, {headers: headers, observe: "response", responseType: "text"}).pipe(
            map((response: HttpResponse<any>) => {
                // as long as we get here, it worked
                // return the original user
                return user;
            }),
            tap(_ => console.log(`deleted user id=${user.id}`)),
            catchError(err => observableThrowError(err))
        );
    }
}

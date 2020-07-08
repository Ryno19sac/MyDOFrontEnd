import {Observable, throwError as observableThrowError} from 'rxjs';
import {Injectable} from '@angular/core';

import {UserRole} from './user-role';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {catchError, map, retryWhen, tap} from 'rxjs/operators';
import {ResponseBase} from "../shared/model";
import {Environment} from "../shared/environment";

const headers = new HttpHeaders({'Content-Type': 'application/json'});

@Injectable()
export class UserRoleService {
  constructor(private environment: Environment, private http: HttpClient) {
  }

  /** GET users from the server */
  getUserRoles(page: number, limit: number): Observable<ResponseBase<UserRole[]>> {
    return this.http.get<ResponseBase<UserRole[]>>(
      `${this.environment.apiUrl}/user-roles?page=${page}&limit=${limit}`
    );
  }

  /** GET user by id. Will 404 if id not found */
  getUserRole(id: number): Observable<UserRole> {
    const url = `${this.environment.apiUrl}/user-roles/${id}`;
    return this.http.get<UserRole>(url).pipe(
      tap(_ => console.log(`fetched user id=${id}`)),
      catchError(err => observableThrowError(err))
    );
  }

  //////// CRUD methods //////////

  create(userRole: UserRole): Observable<ResponseBase<UserRole>> {
    const url = `${this.environment.apiUrl}/user-roles`;
    return this.http.post(url, JSON.stringify(userRole), {headers: headers}).pipe(
      map((response: ResponseBase<UserRole>) => response),
      tap(response => console.log('got created user role response', response)),
      retryWhen(err => {
        console.log('in retryWhen, checking the error', err);
        throw err;
      }),
      catchError(err => observableThrowError(err))
    );
  }

  update(userRole: UserRole): Observable<ResponseBase<UserRole>> {
    const url = `${this.environment.apiUrl}/user-roles/${userRole.id}`;
    return this.http.put(url, JSON.stringify(userRole), {headers: headers}).pipe(
      map((result: ResponseBase<UserRole>) => result),
      tap(result => console.log('got created user role', result)),
      retryWhen(err => {
        console.log('in retryWhen, checking the error', err);
        throw err;
      }),
      catchError(err => observableThrowError(err))
    );
  }

  delete(userRole: UserRole): Observable<UserRole> {
    const url = `${this.environment.apiUrl}/user-roles/${userRole.id}`;
    return this.http.delete(url, {headers: headers, observe: 'response', responseType: 'text'}).pipe(
      map((response: HttpResponse<any>) => {
        // as long as we get here, it worked
        // return the original user
        return userRole;
      }),
      tap(_ => console.log(`deleted user role id=${userRole.id}`)),
      catchError(err => observableThrowError(err))
    );
  }
}

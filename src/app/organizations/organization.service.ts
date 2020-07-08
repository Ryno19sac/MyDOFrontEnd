import {Observable, throwError as observableThrowError} from 'rxjs';
import {Injectable} from '@angular/core';
import {Organization} from './organization';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {catchError, map, retryWhen, tap} from 'rxjs/operators';
import {Environment} from "../shared/environment";
import {ResponseBase} from "../shared/model";

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable()
export class OrganizationService {
  organizations: Organization[] = [];

  constructor(private environment: Environment, private http: HttpClient) {}

  getOrganization(id: number): Observable<Organization> {
    return this.http.get<Organization>(
      `${this.environment.apiUrl}/organizations/${id}`,
      {headers: headers}).pipe(
      tap(_ => console.log(`fetched organization id=${id}`)),
      catchError(err => observableThrowError(err))
    );
  }

  getGaleEngageOrganizationInfo(id: number): Observable<Organization> {
    return this.http.get<Organization>(
      `${this.environment.apiUrl}/organizations/${id}/gale-setup`,
      {headers: headers}).pipe(
      tap(_ => console.log(`fetched organization id=${id}`)),
      catchError(err => observableThrowError(err))
    );
  }

  listOrganizations(page: number, limit: number): Observable<ResponseBase<Organization[]>> {
    return this.http.get<ResponseBase<Organization[]>>(
      `${this.environment.apiUrl}/organizations?page=${page}&limit=${limit}`,
      {headers: headers});
  }

  listOrganizationsForShipment(id: number, page: number, limit: number): Observable<ResponseBase<Organization[]>> {
    return this.http.get<ResponseBase<Organization[]>>(
      `${this.environment.apiUrl}/organizations/${id}/organizations?page=${page}&limit=${limit}`,
      {headers: headers});
  }
  search(term: string, page: number, limit: number): Observable<ResponseBase<Organization[]>> {
    // sanity check the inputs
    if (!term || term.length === 0) {
      return this.listOrganizations(page, limit);
    }
    return this.http.get<ResponseBase<Organization[]>>(
      `${this.environment.apiUrl}/organizations?q=${ encodeURIComponent(term) }&page=${page}&limit=${limit}`,
      {headers: headers}
    )
    .pipe(
      map((results: ResponseBase<Organization[]>) => {
        // in this case, the object is a list of demographicOrganizations
        return results;
      }),
      catchError(err => observableThrowError(err))
    );
  }

  //////// CRUD methods //////////

  create(organization: Organization): Observable<Organization> {
    const url = `${this.environment.apiUrl}/organizations`;
    return this.http.post(url, JSON.stringify(organization), { headers: headers }).pipe(
      retryWhen(err => {
        console.log('in retryWhen, checking the error', err);
        throw err;
      }),
      catchError(err => observableThrowError(err))
    );
  }

  update(id: number, organization: Organization): Observable<Organization> {
    const url = `${this.environment.apiUrl}/organizations/${id}`;
    return this.http.put(url, JSON.stringify(organization), { headers: headers }).pipe(
      retryWhen(err => {
        console.log('in retryWhen, checking the error', err);
        throw err;
      }),
      catchError(err => observableThrowError(err))
    );
  }

  delete(organization: Organization): Observable<Organization> {
    const url = `${this.environment.apiUrl}/organizations/${organization.id}`;
    return this.http.delete(url, { headers: headers, observe: 'response', responseType: 'text' }).pipe(
      map((response: HttpResponse<any>) => {
        // as long as we get here, it worked
        // return the original organization
        return organization;
      }),
      tap(_ => console.log(`deleted organization id=${organization.id}`)),
      catchError(err => observableThrowError(err))
    );
  }
}

import {Observable, throwError as observableThrowError} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, retryWhen, tap} from 'rxjs/operators';
import {Environment} from '../shared/environment';
import { UserRegistration } from './user-registration';


const headers = new HttpHeaders({'Content-Type': 'application/json'});

@Injectable()
export class RegistrationService {

    constructor(private environment: Environment,
                private http: HttpClient) {
    }

    register(registration: UserRegistration): Observable<UserRegistration> {
        const url = `${this.environment.apiUrl}/users`;
        return this.http.post(url, JSON.stringify(registration), {headers: headers}).pipe(
            map((response: UserRegistration) => response),
            tap(response => console.log('got created response', response))
        );
    }
}
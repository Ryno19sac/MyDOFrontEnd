import {Observable, throwError as observableThrowError} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, retryWhen, tap} from 'rxjs/operators';
import {Environment} from '../../shared/environment';
import { Ritual } from '../../interfaces/ritual';

const headers = new HttpHeaders({'Content-Type': 'application/json'});

@Injectable()
export class RitualService {
    constructor(private environment: Environment,
                private http: HttpClient) {
    }

    register(ritual: Ritual): Observable<Ritual> {
        const url = `${this.environment.apiUrl}/rituals`;
        return this.http.post(url, JSON.stringify(ritual), {headers: headers}).pipe(
            map((response: Ritual) => response),
            tap(response => console.log('created response', response))
        )
    } 

    update(id: number, ritual: Ritual): Observable<{}> {
        const url = `${this.environment.apiUrl}/rituals/${id}`;
        return this.http.put(url, JSON.stringify(ritual), { headers: headers }).pipe(
            retryWhen(err => {
                console.log('in retryWhen', err);
                throw err;
            }),
        );
    }

    getRitual(): Observable<Ritual[]> {
        return this.http.get<Ritual[]>(
            `${this.environment.apiUrl}/rituals`,
            {headers: headers}).pipe(
                tap(_ => console.log('fetched rituals')),
                catchError(error => observableThrowError(error))
            )
    }

    deleteRitual(id: number): Observable<{}> {
        const url = `${this.environment.apiUrl}/rituals/${id}`;
        return this.http.delete(url)
    }

    // updateRitual(id:number): Observable<Ritual> {
    //     return this.http.put<Ritual>(
    //         `${this.environment.apiUrl}/rituals/${id}`
    //     )
    // }
}
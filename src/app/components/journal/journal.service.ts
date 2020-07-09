import {Observable, throwError as observableThrowError} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, retryWhen, tap} from 'rxjs/operators';
import {Environment} from '../../shared/environment';
import { Ritual } from '../../interfaces/ritual';
import { Journal } from '../../interfaces/journal';

const headers = new HttpHeaders({'Content-Type': 'application/json'});

@Injectable()
export class JournalService {

    constructor(private environment: Environment,
                private http: HttpClient) {
    }

    register(entry: Journal): Observable<Journal> {
        const url = `${this.environment.apiUrl}/journals`;
        return this.http.post(url, JSON.stringify(entry), {headers: headers}).pipe(
            map((response: Journal) => response),
            tap(response => console.log('created response', response))
        )
    } 

    getEntry(): Observable<Journal[]> {
        return this.http.get<Journal[]>(
            `${this.environment.apiUrl}/journals`,
            {headers: headers}).pipe(
                tap(_ => console.log('fetched entries')),
                catchError(error => observableThrowError(error))
            );
    }

    deleteEntry(id: number): Observable<{}> {
        const url = `${this.environment.apiUrl}/journals/${id}`;
        return this.http.delete(url)
    }
}
import {Observable, throwError as observableThrowError} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, retryWhen, tap} from 'rxjs/operators';
import {Environment} from '../../shared/environment';
import { UserRegistration } from 'apps/biblioveda/src/app/registration/user-registration';
import { Todo } from '../../interfaces/todo';

const headers = new HttpHeaders({'Content-Type': 'application/json'});

@Injectable()
export class TodoService {

    constructor(private environment: Environment,
                private http: HttpClient) {
    }

    register(todo: Todo): Observable<Todo> {
        const url = `${this.environment.apiUrl}/todos`;
        return this.http.post(url, JSON.stringify(todo), {headers: headers}).pipe(
            map((response: Todo) => response),
            tap(response => console.log('got created response', response))
        );
    }

    getTodo(): Observable<Todo[]> {
        return this.http.get<Todo[]>(
            `${this.environment.apiUrl}/todos`, 
            {headers: headers}).pipe(
            tap(_ => console.log('fetched todos')),
            catchError(error => observableThrowError(error))
        );

    }

    deleteTodo(id: number): Observable<{}> {
        const url = `${this.environment.apiUrl}/todos/${id}`;
        return this.http.delete(url)
        console.log('here')    
    }
    // retrieve(todos: Todo): null {

    //     todos = this.http.get<Todo>(`${this.environment.apiUrl}/todos`).subscribe(data => 
    //         console.log(data));


            
        // }
    // retrieve(todo: Todo): Observable<Todo[]> {
    //     const url = `${this.environment.apiUrl}/todos`;
    //     return this.http.get(url, JSON.stringify(todo)
    //     // .pipe(
    //         // map((response: Todo) => response),
    //     //     tap(response => console.log('got created response', response))
    //     // );
    // },

}
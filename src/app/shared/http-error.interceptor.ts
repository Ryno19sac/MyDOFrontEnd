import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import { MatSnackBar } from "@angular/material/snack-bar";
import {Environment} from "./environment";
import { Injectable } from "@angular/core";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private environment: Environment,
    private snackBar: MatSnackBar
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
    .pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        console.error("caught error", error);

        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `A client side error occurred: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `A backend error occurred: ${error.status}\nMessage: ${error.message}`;
          // check for specific errors
          if (error.status === 0) {
            console.error("unknown error");
            // usually this means that the backend bv-support-admin-service is down or inaccessible
            errorMessage = "Failed to retrieve data. Please contact support.";
          } else if (error.status === 401) {
            console.error("authentication required error");
            errorMessage = "Authentication required to access this resource";
          } else if (error.status === 403) {
            console.error("access denied error");
            errorMessage = "You do not have permission to access this resource";
          } else if (error.status === 404) {
            console.error("object not found error");
            errorMessage = "This requested resource does not exist.";
          } else if (error.status === 500) {
            errorMessage = "Something is wrong on the backend. Please contact support.";
          }
        }
        // do this differently for login
          if(request.url.indexOf("api/authenticate") > 0) {
           // show login failed
           errorMessage = "The username or password is incorrect";
          }

        // show an error message
        this.snackBar.open(errorMessage, null, {
          panelClass: ['snackbar-error'],
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: this.environment.snackBarTimeout
        });
        return throwError(error);
      })
    )
  }
}
import {AfterViewInit, Component, OnDestroy, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {AuthService} from '../auth/auth.service';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {merge, of as observableOf} from 'rxjs';
import {Store} from '@ngrx/store';
import {Environment} from "../shared/environment";
import {GlobalState} from "../+state/global.interfaces";
import {UserRoleService} from "./user-role.service";
import {UserRole} from "./user-role";
import {ResponseBase} from "../shared/model";

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html'
})
export class UserRolesComponent implements AfterViewInit, OnDestroy {
  users: UserRole[];
  displayedColumns = ['name', 'description', 'systemRole', 'status', 'updated', 'menu'];
  dataSource = new MatTableDataSource<UserRole>();
  isLoadingResults = true;
  isErrored = false;
  resultsLength: number;
  private selectedRowIndex = -1;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private environment: Environment,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private store: Store<GlobalState>,
    private userRoleService: UserRoleService
  ) {
  }

  ngAfterViewInit() {
    // If the organization changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    // load the data
    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
      startWith({}),
      switchMap(() => {
        // make the api call for the events
        return this.userRoleService.getUserRoles(
          this.paginator.pageIndex,
          this.paginator.pageSize
        );
      }),
      map((results: ResponseBase<UserRole[]>) => {
        // Flip flag to show that loading has finished.
        this.isLoadingResults = false;
        this.resultsLength = results.totalCount;
        return results.object;
      }),
      catchError(() => {
        this.isLoadingResults = false;
        this.isErrored = true;
        // Catch if the GitHub API has reached its rate limit. Return empty data.
        return observableOf([]);
      })
    )
    .subscribe((data: UserRole[]) => (this.dataSource.data = data));
  }

  ngOnDestroy() {
    this.dataSource = null;
  }

  deleteUserRole(userRole: UserRole): void {
    // make a clone of the data
    const clonedData = this.dataSource.data.map(x => Object.assign({}, x));
    // send the user to the server
    this.userRoleService.delete(userRole).subscribe(
      (result: UserRole) => {
        console.log('deleted the user role ', userRole);
        // set a success message
        this.snackBar.open('Successfully deleted the user role ' + userRole.name, null, {
          panelClass: ['snackbar-success'],
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: this.environment.snackBarTimeout
        });
        // remove the object in question from the list
        for (let j = 0; j < clonedData.length; j++) {
          // get the current account
          const currentUserRole = clonedData[j];
          console.log('currentUserRole is ', currentUserRole);
          // compare them
          if (userRole.id === currentUserRole.id) {
            console.log('got a match on id ', userRole.id);
            // pop it from the clone
            clonedData.splice(j, 1);
            // notify the datasource that it the data has changed
            this.dataSource.data = clonedData;
            break;
          }
        }
      },
      err => {
        console.log('caught a user creation error', err);
        // show an error message
        this.snackBar.open('Error deleting the user role ' + userRole.name, null, {
          panelClass: ['snackbar-error'],
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: this.environment.snackBarTimeout
        });
      },
      () => {
        console.log('Completed');
      }
    );
  }

  gotoDetail(userRole: UserRole): void {
    this.router.navigate(['/user-roles/', userRole.id]);
  }

  gotoEdit(userRole: UserRole): void {
    this.router.navigate(['/user-roles/', userRole.id]);
  }

  highlight(userRole: UserRole): void {
    this.selectedRowIndex = userRole.id;
  }
}

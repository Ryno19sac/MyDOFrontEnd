import {AfterViewInit, Component, OnDestroy, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {AuthService} from '../auth/auth.service';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {merge, of as observableOf} from 'rxjs';
import {User} from './user';
import {Environment} from '../shared/environment';
import {UserService} from './user.service';
import {ResponseBase} from '../shared/model';
import {OrganizationService} from '../organizations/organization.service';
import {HasOrganization} from '../organizations/has-organization';
import {Store} from '@ngrx/store';
import {GlobalState} from '../+state/global.interfaces';

@Component({
    selector: 'biblioveda-app-users',
    templateUrl: './users.component.html'
})
export class UsersComponent extends HasOrganization implements AfterViewInit, OnDestroy {
    selectedRowIndex = -1;
    users: User[];
    displayedColumns = ['firstName', 'lastName', 'email', 'type', 'menu'];
    dataSource = new MatTableDataSource<User>();
    isLoadingResults = true;
    isErrored = false;
    resultsLength: number;
    organizationId: number;
    // organization: Organization;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    constructor(
        private environment: Environment,
        public authService: AuthService,
        private store: Store<GlobalState>,
        private route: ActivatedRoute,
        private router: Router,
        private snackBar: MatSnackBar,
        private userService: UserService,
        private organizationService: OrganizationService
    ) {
        // init the super class
        super(store);
    }
    ngOnDestroy(): void {
        throw new Error("Method not implemented.");
    }

    ngAfterViewInit() {
        // get the organization id
        this.organizationId = this.getOrganizationId();
        // look up the organization
        // forkJoin([
        //     this.organizationService.getOrganization(this.organizationId)
        // ]).subscribe(([organization]) => {
        //     // store them locally
        //     this.organization = organization;
        // });
        // If the organization changes the sort order, reset back to the first page.
        // this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
        // load the data
    //     merge(this.sort.sortChange, this.paginator.page)
    //         .pipe(
    //             startWith({}),
    //             switchMap(() => {
    //                 // make the api call for the events
    //                 return this.userService.listUsers(this.organizationId, this.paginator.pageIndex, this.paginator.pageSize);
    //             }),
    //             map((results: ResponseBase<User[]>) => {
    //                 console.log('got users', results);
    //                 // Flip flag to show that loading has finished.
    //                 this.isLoadingResults = false;
    //                 this.resultsLength = results.totalCount;
    //                 return results.object;
    //             }),
    //             catchError(() => {
    //                 this.isLoadingResults = false;
    //                 this.isErrored = true;
    //                 // Catch if the GitHub API has reached its rate limit. Return empty data.
    //                 return observableOf([]);
    //             })
    //         )
    //         .subscribe((data: User[]) => (this.dataSource.data = data));
    // }

    // ngOnDestroy() {
    //     this.dataSource = null;
    // }

    // deleteUser(user: User): void {
    //     // make a clone of the data
    //     const clonedData = this.dataSource.data.map(x => Object.assign({}, x));
    //     // send the user to the server
    //     this.userService.delete(this.organizationId, user).subscribe(
    //         (result: User) => {
    //             console.log('deleted the user ', user);
    //             // set a success message
    //             this.snackBar.open('Successfully deleted the user ' + user.firstName + ' ' + user.lastName, null, {
    //                 panelClass: ['snackbar-success'],
    //                 horizontalPosition: 'center',
    //                 verticalPosition: 'top',
    //                 duration: this.environment.snackBarTimeout
    //             });
    //             // remove the object in question from the list
    //             for (let j = 0; j < clonedData.length; j++) {
    //                 // get the current account
    //                 const currentUser = clonedData[j];
    //                 console.log('currentUser is ', currentUser);
    //                 // compare them
    //                 if (user.id === currentUser.id) {
    //                     console.log('got a match on id ', user.id);
    //                     // pop it from the clone
    //                     clonedData.splice(j, 1);
    //                     // notify the datasource that it the data has changed
    //                     this.dataSource.data = clonedData;
    //                     break;
    //                 }
    //             }
    //         },
    //         err => {
    //             console.log('caught a user creation error', err);
    //             // show an error message
    //             this.snackBar.open('Error deleting the user ' + user.firstName + ' ' + user.lastName, null, {
    //                 panelClass: ['snackbar-error'],
    //                 horizontalPosition: 'center',
    //                 verticalPosition: 'top',
    //                 duration: this.environment.snackBarTimeout
    //             });
    //         },
    //         () => {
    //             console.log('Completed');
    //         }
    //     );
    // }

    // gotoDetail(user: User): void {
    //     // this.router.navigate(['/users/', user.id]);
    // }

    // gotoEdit(user: User): void {
    //     // this.router.navigate(['/users/', user.id, 'edit']);
    // }

    // highlight(user: User): void {
    //     // this.selectedRowIndex = user.id;
    // }

    // isHighlighted(user: User): void {
    //     // return this.selectedRowIndex === user.id;
    // }
    }
}

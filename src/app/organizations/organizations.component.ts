import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import {AuthService} from '../auth/auth.service';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import {fromEvent, merge} from 'rxjs';
import {Environment} from "../shared/environment";
import {Organization} from "./organization";
import {GlobalState} from "../+state/global.interfaces";
import {OrganizationService} from "./organization.service";
import {OrganizationsDataSource} from "./organizations.datasource";

@Component({
    selector: 'biblioveda-app-organizations',
    templateUrl: './organizations.component.html'
})
export class OrganizationsComponent implements OnInit, AfterViewInit, OnDestroy {
    selectedRowIndex = -1;
    displayedColumns = ['name', 'stripeId', 'active', 'modified', 'menu'];
    dataSource: OrganizationsDataSource;

    @ViewChild('searchInput') searchInput: ElementRef;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
      private environment: Environment,
      private store: Store<GlobalState>,
      public authService: AuthService,
      private router: Router,
      private snackBar: MatSnackBar,
      private organizationService: OrganizationService
    ) {

    }

    ngOnInit(): void {
        // create the datasource
        this.dataSource = new OrganizationsDataSource(this.organizationService);
        // load the initial search
        this.dataSource.searchOrganizations('', 0, 10);
    }

    ngAfterViewInit() {
        // If the carrier changes the sort order, reset back to the first page.
        this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
        // server-side search
        fromEvent(this.searchInput.nativeElement, 'keyup')
        .pipe(
          debounceTime(500),
          distinctUntilChanged(),
          tap(() => {
              this.paginator.pageIndex = 0;
              this.loadOrganizations();
          })
        )
        .subscribe();
        // listen for sort and paging changes
        merge(this.sort.sortChange, this.paginator.page)
        .pipe(tap(() => this.loadOrganizations()))
        .subscribe();
    }

    ngOnDestroy() {
        this.dataSource = null;
    }

    loadOrganizations() {
        // all organizations
        this.dataSource.searchOrganizations(
          this.searchInput.nativeElement.value,
          this.paginator.pageIndex,
          this.paginator.pageSize
        );
    }

    deleteOrganization(organization: Organization): void {
        // send the organization to the server
        this.organizationService.delete(organization).subscribe(
            (result: Organization) => {
                console.log('deleted the organization ', organization);
                // set a success message
                this.snackBar.open('Successfully deleted the organization ' + result.name, null, {
                    panelClass: ['snackbar-success'],
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                    duration: this.environment.snackBarTimeout
                });
                // remove the organization in question from the list
                this.dataSource.deleteOrganization(organization);
            },
            err => {
                console.log('caught a organization deletion error', err);
                // set a error message
                this.snackBar.open('Error deleting the organization ' + organization.name, null, {
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

    gotoDetail(organization: Organization): void {
        this.router.navigate(['organizations', organization.id]);
    }

    gotoEdit(organization: Organization): void {
        this.router.navigate(['organizations', organization.id, 'edit']);
    }

    gotoLocations(organization: Organization): void {
        this.router.navigate(['organizations', organization.id, 'locations']);
    }

    highlight(organization: Organization): void {
        this.selectedRowIndex = organization.id;
    }

    isHighlighted(organization: Organization): boolean {
        return this.selectedRowIndex === organization.id;
    }
}

import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrganizationService} from './organization.service';
import {Organization} from './organization';
import {Environment} from '../shared/environment';
import {Store} from '@ngrx/store';
import {GlobalState} from '../+state/global.interfaces';
import {AuthService} from '../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'biblioveda-app-organization',
    templateUrl: './organization.component.html'
})
export class OrganizationComponent implements OnInit {
    @Input() organization: Organization;


    

    isLoading: boolean;

    constructor(
        private environment: Environment,
        private store: Store<GlobalState>,
        public authService: AuthService,
        private snackBar: MatSnackBar,
        private organizationService: OrganizationService,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.isLoading = true;

        const id = +this.route.snapshot.paramMap.get('organizationId');
        /* TODO update this to not be nested */
        // get the organization by the id
        this.organizationService.getOrganization(id).subscribe((organization: Organization) => {
                this.organization = organization;

                
            },
            err => {
                console.log('caught an error loading organization information', err);
            },
            () => {
                // end loading
                this.isLoading = false;
            }
        );
    }

    deleteOrganization(organization: Organization): void {
        // send the organization to the server
        this.organizationService.delete(organization).subscribe(
            (result: Organization) => {
                console.log('deleted the organization ', organization);
                // set a success message
                this.snackBar.open('Successfully deleted the organization ' + result.id, null, {
                    panelClass: ['snackbar-success'],
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                    duration: this.environment.snackBarTimeout
                });
                // send them back to the list
                this.router.navigate(['/organizations']);
            },
            err => {
                console.log('caught a organization deletion error', err);
                // set a error message
                this.snackBar.open('Error deleting the organization ' + organization.id, null, {
                    panelClass: ['snackbar-error'],
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                    duration: this.environment.snackBarTimeout
                });
            }
        );
    }

    gotoEdit(organization: Organization): void {
        this.router.navigate(['organizations', organization.id, 'edit']);
    }

    gotoLocations(organization: Organization): void {
        this.router.navigate(['organizations', organization.id, 'locations']);
    }
}

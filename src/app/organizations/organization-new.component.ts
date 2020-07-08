import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth/auth.service';
import {Organization} from './organization';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Store} from '@ngrx/store';
import {OrganizationService} from './organization.service';
import {Environment} from '../shared/environment';
import {GlobalState} from '../+state/global.interfaces';
import {verifyUniqueUserEmail} from "../shared/validators/unique-email-validator.directive";
import {UserService} from "../users/user.service";

@Component({
    selector: 'biblioveda-app-organization-new',
    templateUrl: './organization-new.component.html'
})
export class OrganizationNewComponent implements OnInit {
    organizationForm: FormGroup;

    constructor(
        private environment: Environment,
        private store: Store<GlobalState>,
        private authService: AuthService,
        private organizationService: OrganizationService,
        private userService: UserService,
        private router: Router,
        private location: Location,
        private snackBar: MatSnackBar,
        private fb: FormBuilder
    ) {
    }

    ngOnInit(): void {
        // create the new form
        this.organizationForm = this.fb.group({
            name: ['', {validators: [Validators.required]}],
            invitationEmail: ['', [Validators.required, Validators.email], verifyUniqueUserEmail(this.userService, '')],
            initializationFee: ['', {validators: [Validators.required]}],
            subscriptionFee: ['', {validators: [Validators.required]}]
        });
    }

    saveOrganization(): void {
        const formModel = this.organizationForm.value;
        // copy the organization object
        const saveOrganization: Organization = {
            name: formModel.name,
            invitationEmail: formModel.invitationEmail,
            initializationFee: formModel.initializationFee,
            subscriptionFee: formModel.subscriptionFee
        };
        // send the organization to the server
        this.organizationService.create(saveOrganization).subscribe(
            (response: Organization) => {
                // set a success message
                this.snackBar.open('Successfully created the organization ' + response.name, null, {
                    panelClass: ['snackbar-success'],
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                    duration: this.environment.snackBarTimeout
                });
                // send them back to the list
                return this.router.navigate(['/organizations']);
            },
            err => {
                console.log('caught a organization creation error', err);
                this.snackBar.open('Failed to create the organization ' + saveOrganization.name, null, {
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

    cancel(): void {
        // head back to whence we came
        this.location.back();
    }
}

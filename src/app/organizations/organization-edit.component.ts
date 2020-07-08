import {Component, Input, OnInit} from "@angular/core";
import {OrganizationService} from "./organization.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../auth/auth.service";
import {Organization} from "./organization";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Store} from "@ngrx/store";
import {Environment} from "../shared/environment";
import {GlobalState} from "../+state/global.interfaces";

@Component({
    selector: "biblioveda-app-organization-edit",
    templateUrl: "./organization-edit.component.html"
})
export class OrganizationEditComponent implements OnInit {
    @Input() organization: Organization;
    id: number;
    // global state variables we need for this form
    organizationForm: FormGroup;
    // indicate loading state
    isLoading = false;
    isFormLoading = true;

    constructor(
        private environment: Environment,
        private store: Store<GlobalState>,
        private authService: AuthService,
        private organizationService: OrganizationService,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location,
        private snackBar: MatSnackBar,
        private fb: FormBuilder
    ) {
    }

    ngOnInit(): void {
        this.id = +this.route.snapshot.paramMap.get("organizationId");
        // load the needed page data in parallel
        this.organizationService.getOrganization(this.id).subscribe(
            (organization: Organization) => {
                // set the organization
                this.organization = organization;
                // create the form
                this.createOrganizationEditForm(this.organization);
                // end loading
                this.isLoading = false;
            },
            err => {
                // end loading
                this.isLoading = false;
                console.log("caught an error loading organization information", err);
                // set a error message
                this.snackBar.open("Error loading organization information", null, {
                    panelClass: ["snackbar-error"],
                    horizontalPosition: "center",
                    verticalPosition: "top",
                    duration: this.environment.snackBarTimeout
                });
            },
            () => {
                console.log("Completed");
            }
        );
    }

    createOrganizationEditForm(organization: Organization): void {
        // build the form
        this.organizationForm = this.fb.group({
            organizationName: [organization.name, {validators: [Validators.required]}],
            invitationEmail: [organization.invitationEmail, {validators: [Validators.required]}],
            initializationFee: [organization.initializationFee, {validators: [Validators.required, Validators.min(1)]}],
            subscriptionFee: [organization.subscriptionFee, {validators: [Validators.required, Validators.min(1)]}],
            clientId: new FormControl({value: organization.clientId, disabled: true}),
            clientSecret: new FormControl({value: organization.clientSecret, disabled: true}),
            status: organization.active
        });
        this.isFormLoading = false;
    }

    saveOrganization(): void {
        // get the form model
        const formModel = this.organizationForm.value;

        // and deep copies of changed form model values
        const saveOrganization: Organization = {
            id: this.organization.id,
            name: formModel.organizationName,
            initializationFee: formModel.initializationFee,
            subscriptionFee: formModel.subscriptionFee,
            active: formModel.status
        };
        // send the organization to the server
        this.organizationService.update(this.organization.id, saveOrganization).subscribe(
            (response: Organization) => {
                // set a success message
                this.snackBar.open("Successfully updated the organization: " + response.name, null, {
                    panelClass: ["snackbar-success"],
                    horizontalPosition: "center",
                    verticalPosition: "top",
                    duration: this.environment.snackBarTimeout
                });
                // send them to their desired page
                return this.router.navigateByUrl("/organizations");
            },
            err => {
                console.log("caught a organization creation error", err);
                this.snackBar.open("Failed to update the organization: " + this.organization.name, null, {
                    panelClass: ["snackbar-error"],
                    horizontalPosition: "center",
                    verticalPosition: "top",
                    duration: this.environment.snackBarTimeout
                });
            },
            () => {
                console.log("Completed");
            }
        );
    }

    cancel(): void {
        // head back to whence we came
        this.location.back();
    }
}

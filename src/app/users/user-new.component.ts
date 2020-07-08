import {forkJoin} from 'rxjs';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {AuthService} from '../auth/auth.service';
import {User} from './user';
import {UserRole} from '../user-roles/user-role';
import {Environment} from '../shared/environment';
import {UserService} from './user.service';
import {UserRoleService} from '../user-roles/user-role.service';
import {GlobalState} from '../+state/global.interfaces';
import {Store} from '@ngrx/store';
import {verifyUniqueUserEmail} from '../shared/validators/unique-email-validator.directive';
import {ResponseBase} from '../shared/model';
import {OrganizationService} from '../organizations/organization.service';
import {HasOrganization} from '../organizations/has-organization';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'biblioveda-app-user-new',
    templateUrl: './user-new.component.html'
})
export class UserNewComponent extends HasOrganization implements OnInit {
    userForm: FormGroup;
    // indicate loading state
    isLoading = false;
    // whether the object has been updated
    userRoles: UserRole[];
    organizationId: number;
    // organization: Organization;

    constructor(
        private environment: Environment,
        public authService: AuthService,
        public userService: UserService,
        public userRoleService: UserRoleService,
        private organizationService: OrganizationService,
        private store: Store<GlobalState>,
        public router: Router,
        private location: Location,
        private snackBar: MatSnackBar,
        private fb: FormBuilder
    ) {
        // init the super class
        super(store);
    }

    ngOnInit(): void {
    //     console.log('creating a new user');
    //     // get the organization id
    //     this.organizationId = this.getOrganizationId();
    //     // create the form
    //     this.createUserForm();

    //     forkJoin([
    //         this.userRoleService.getUserRoles(0, 100),
    //         // this.organizationService.getOrganization(this.organizationId)
    //     ]).subscribe(
    //         ([userRoles]) => {
    //             console.log('fork join finished with results', userRoles);
    //             this.userRoles = userRoles.object;
    //             // this.organization = organization;
    //             // end loading
    //             this.isLoading = false;
    //         },
    //         err => {
    //             // end loading
    //             this.isLoading = false;
    //             console.log('caught an error loading user information', err);
    //             // set a error message
    //             this.snackBar.open('Error loading user information', null, {
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

    // createUserForm(): void {
    //     this.userForm = this.fb.group(
    //         {
    //             email: ['', [Validators.required, Validators.email], verifyUniqueUserEmail(this.userService, '')],
    //             firstName: ['', {validators: [Validators.required]}],
    //             lastName: ['', {validators: [Validators.required]}],
    //             userRoleId: ['', {validators: [Validators.required]}],
    //             superUser: []
    //         },
    //     );
    // }

    // saveUser(): void {
    //     const formModel = this.userForm.value;
    //     // make a deep copy of he form
    //     const saveUser: User = {
    //         id: null,
    //         // userRoleId: formModel.userRoleId,
    //         // firstName: formModel.firstName,
    //         // lastName: formModel.lastName,
    //         // email: formModel.email,
    //         // superUser: formModel.superUser
    //     };
    //     // send the user to the server
    //     this.userService.create(this.organizationId, saveUser).subscribe(
    //         (response: ResponseBase<User>) => {
    //             console.log('got the response ', response);
    //     //         // set a success message
    //     //         this.snackBar.open('Successfully invited the user ' + saveUser.firstName + ' ' + saveUser.lastName + '. We have sent an invitation to the user with instructions.', null, {
    //     //             panelClass: ['snackbar-success'],
    //     //             horizontalPosition: 'center',
    //     //             verticalPosition: 'top',
    //     //             duration: this.environment.snackBarTimeout
    //     //         });
    //     //         // send them to their desired page
    //     //         this.router.navigate(['/users']);
    //     //     },
    //     //     err => {
    //     //         this.snackBar.open('Error creating the user ' + saveUser.firstName + ' ' + saveUser.lastName, null, {
    //     //             panelClass: ['snackbar-error'],
    //     //             horizontalPosition: 'center',
    //     //             verticalPosition: 'top',
    //     //             duration: this.environment.snackBarTimeout
    //     //         });
    //     //     },
    //     //     () => {
    //     //         console.log('Completed');
    //     //     }
    //     // );
    // }

    // // cancel(): void {
    // //     // head back to whence we came
    // //     this.location.back();
    // // }

    // // getFormValidationErrors(formGroup: FormGroup) {
    // //     Object.keys(formGroup.controls).forEach(key => {
    // //         const controlErrors: ValidationErrors = formGroup.get(key).errors;
    // //         if (controlErrors != null) {
    // //             Object.keys(controlErrors).forEach(keyError => {
    // //                 console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
    // //             });
    // //         }
    // //     });
    // // }
    }
}

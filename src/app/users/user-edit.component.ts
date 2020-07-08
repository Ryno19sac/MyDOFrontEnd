import {forkJoin} from 'rxjs';
import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {User} from './user';
import {UserRole} from '../user-roles/user-role';
import {Environment} from '../shared/environment';
import {UserService} from './user.service';
import {UserRoleService} from '../user-roles/user-role.service';
import {GlobalState} from '../+state/global.interfaces';
import {Store} from '@ngrx/store';
import {notBlankValidator} from '../shared/validators/not-blank-validator.directive';
import {verifyUniqueUserEmail} from '../shared/validators/unique-email-validator.directive';
import {ResponseBase} from '../shared/model';
import {OrganizationService} from '../organizations/organization.service';
import {HasOrganization} from '../organizations/has-organization';

@Component({
    selector: 'biblioveda-app-user-edit',
    templateUrl: './user-edit.component.html'
})
export class UserEditComponent extends HasOrganization implements OnInit {

    @Input() user: User;
    userForm?: FormGroup;
    // all the organizations
    // userRoles: UserRole[];
    // indicate loading state
    isLoading = false;

    constructor(
        private environment: Environment,
        public authService: AuthService,
        private organizationService: OrganizationService,
        private userService: UserService,
        private userRoleService: UserRoleService,
        private store: Store<GlobalState>,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        private snackBar: MatSnackBar,
        private fb: FormBuilder
    ) {
        // init the super class
        super(store);
    }

    ngOnInit(): void {
    //     // set loading
    //     this.isLoading = true;
    //     const userId = +this.route.snapshot.paramMap.get('userId');
    //     // load the needed page data in parallel
    //     forkJoin([
    //         this.userService.getUser(this.getOrganizationId(), userId),
    //         this.userRoleService.getUserRoles(0, 100),
    //         // this.organizationService.getOrganization(this.organizationId)
    //     ]).subscribe(
    //         ([user, userRoles]) => {
    //             console.log('fork join finished with results', user, userRoles);
    //             this.userRoles = userRoles.object;
    //             // set the user
    //             this.user = user;
    //             // this.organization = organization;
    //             // create the form
    //             this.createEditForm(user);
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

    // createEditForm(user: User): void {
    //     this.userForm = this.fb.group({
    //         email: [
    //             user.username, [Validators.required, Validators.email, notBlankValidator()],
    //             verifyUniqueUserEmail(this.userService, user.email)
    //         ],
           
    //     });
    // }

    // saveUser(): void {
    //     // get the form model
    //     const formModel = this.userForm.value;
    //     // make a deep copy of he form
    //     const saveUser: User = {
    //         id: this.user.user_id,
    //         email: formModel.email,
    //         userRoleId: formModel.userRoleId,
    //         firstName: formModel.firstName,
    //         lastName: formModel.lastName,
    //         superUser: formModel.superUser
    //     };
    //     // save it locally
    //     this.user = saveUser;
    //     // send the user to the server
    //     this.userService.update(this.getOrganizationId(), this.user).subscribe(
    //         (response: ResponseBase<User>) => {
    //             console.log('got the response ', response);
    //             // set a success message
    //             this.snackBar.open('Successfully updated the user ' + response.object.email, null, {
    //                 panelClass: ['snackbar-success'],
    //                 horizontalPosition: 'center',
    //                 verticalPosition: 'top',
    //                 duration: this.environment.snackBarTimeout
    //             });
    //             // send them to their desired page
    //             this.router.navigate(['/users']);
    //         },
    //         err => {
    //             console.log('caught a user creation error', err);
    //             this.snackBar.open('Failed to save the user ' + this.user.email, null, {
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

    // cancel(): void {
    //     // head back to whence we came
    //     this.location.back();
    // }
    }
}

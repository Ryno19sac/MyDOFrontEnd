import {forkJoin as observableForkJoin} from 'rxjs';
import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Store} from '@ngrx/store';
import {UserRole} from "./user-role";
import {PERMISSIONS_LIST} from "./user-permission";
import {UserRoleService} from "./user-role.service";
import {Environment} from "../shared/environment";
import {GlobalState} from "../+state/global.interfaces";
import {notBlankValidator} from "../shared/validators/not-blank-validator.directive";
import {ResponseBase} from "../shared/model";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-role-edit.component.html',
  styleUrls: ['./user-role-edit.component.scss']
})
export class UserRoleEditComponent implements OnInit {
  @Input() userRole: UserRole;

  userRoleForm?: FormGroup;

  // indicate loading state
  isLoading = false;
  // whether the object has been updated
  isDefault = true;
  isSuccess = false;
  isError = false;

  permissions = PERMISSIONS_LIST;

  constructor(
    private environment: Environment,
    public authService: AuthService,
    public userRoleService: UserRoleService,
    private store: Store<GlobalState>,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    // load the needed page data in parallel
    observableForkJoin(this.userRoleService.getUserRole(id)).subscribe(
      ([userRole]) => {
        console.log('fork join finished with results', userRole);
        // set the user
        this.userRole = userRole;
        // create the form
        this.createEditForm(userRole);
        // end loading
        this.isLoading = false;
      },
      err => {
        // end loading
        this.isLoading = false;
        console.log('caught an error loading user role information', err);
        // set a error message
        this.snackBar.open('Error loading user role information', null, {
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

  createEditForm(userRole: UserRole): void {
    this.userRoleForm = this.fb.group({
      name: [userRole.name, {validators: [Validators.required, notBlankValidator()]}],
      description: [userRole.description],
      active: [userRole.active],
      // organization permissions
      hasOrganizationView: [userRole.hasOrganizationView, {validators: [Validators.required]}],
      hasOrganizationCreate: [userRole.hasOrganizationCreate, {validators: [Validators.required]}],
      hasOrganizationEdit: [userRole.hasOrganizationEdit, {validators: [Validators.required]}],
      hasOrganizationDelete: [userRole.hasOrganizationDelete, {validators: [Validators.required]}],
      // account permissions
      hasAccountView: [userRole.hasAccountView, {validators: [Validators.required]}],
      hasAccountCreate: [userRole.hasAccountCreate, {validators: [Validators.required]}],
      hasAccountEdit: [userRole.hasAccountEdit, {validators: [Validators.required]}],
      hasAccountDelete: [userRole.hasAccountDelete, {validators: [Validators.required]}],
      // user permissions
      hasUserView: [userRole.hasUserView, {validators: [Validators.required]}],
      hasUserCreate: [userRole.hasUserCreate, {validators: [Validators.required]}],
      hasUserEdit: [userRole.hasUserEdit, {validators: [Validators.required]}],
      hasUserDelete: [userRole.hasUserDelete, {validators: [Validators.required]}],
      // user_role permissions
      hasUserRoleView: [userRole.hasUserRoleView, {validators: [Validators.required]}],
      hasUserRoleCreate: [userRole.hasUserRoleCreate, {validators: [Validators.required]}],
      hasUserRoleEdit: [userRole.hasUserRoleEdit, {validators: [Validators.required]}],
      hasUserRoleDelete: [userRole.hasUserRoleDelete, {validators: [Validators.required]}],
      // location permissions
      hasLocationView: [userRole.hasLocationView, {validators: [Validators.required]}],
      hasLocationCreate: [userRole.hasLocationCreate, {validators: [Validators.required]}],
      hasLocationEdit: [userRole.hasLocationEdit, {validators: [Validators.required]}],
      hasLocationDelete: [userRole.hasLocationDelete, {validators: [Validators.required]}],
    });
  }

  saveUserRole(): void {
    // get the form model
    const formModel = this.userRoleForm.value;
    // make a deep copy of he form
    const saveUserRole: UserRole = {
      id: this.userRole.id,
      name: formModel.name,
      description: formModel.description,
      active: formModel.active,
      // organization permissions
      hasOrganizationView: formModel.hasOrganizationView,
      hasOrganizationCreate: formModel.hasOrganizationCreate,
      hasOrganizationEdit: formModel.hasOrganizationEdit,
      hasOrganizationDelete: formModel.hasOrganizationDelete,
      // account permissions
      hasAccountView: formModel.hasAccountView,
      hasAccountCreate: formModel.hasAccountCreate,
      hasAccountEdit: formModel.hasAccountEdit,
      hasAccountDelete: formModel.hasAccountDelete,
      // user permissions
      hasUserView: formModel.hasUserView,
      hasUserCreate: formModel.hasUserCreate,
      hasUserEdit: formModel.hasUserEdit,
      hasUserDelete: formModel.hasUserDelete,
      // user_role permissions
      hasUserRoleView: formModel.hasUserRoleView,
      hasUserRoleCreate: formModel.hasUserRoleCreate,
      hasUserRoleEdit: formModel.hasUserRoleEdit,
      hasUserRoleDelete: formModel.hasUserRoleDelete,
      // location permissions
      hasLocationView: formModel.hasLocationView,
      hasLocationCreate: formModel.hasLocationCreate,
      hasLocationEdit: formModel.hasLocationEdit,
      hasLocationDelete: formModel.hasLocationDelete,
    };
    // send the user to the server
    this.userRoleService.update(saveUserRole).subscribe(
      (response: ResponseBase<UserRole>) => {
        console.log('got the response ', response);
        // set a success message
        this.snackBar.open('Successfully updated the user role ' + response.object.name, null, {
          panelClass: ['snackbar-success'],
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: this.environment.snackBarTimeout
        });
        // send them to their desired page
        this.router.navigate(['/user-roles']);
      },
      err => {
        console.log('caught a user creation error', err);
        this.snackBar.open('Failed to save the user role ' + this.userRole.name, null, {
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

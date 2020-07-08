import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Store} from '@ngrx/store';
import {ResponseBase} from "../shared/model";
import {UserRole} from "./user-role";
import {notBlankValidator} from "../shared/validators/not-blank-validator.directive";
import {PERMISSIONS_LIST} from "./user-permission";
import {Environment} from "../shared/environment";
import {UserRoleService} from "./user-role.service";
import {GlobalState} from "../+state/global.interfaces";

@Component({
  selector: 'app-user-role-new',
  templateUrl: './user-role-new.component.html',
  styleUrls: ['./user-role-new.component.scss']
})
export class UserRoleNewComponent implements OnInit {
  userRoleForm: FormGroup;
  permissions = PERMISSIONS_LIST;

  constructor(
    private environment: Environment,
    public authService: AuthService,
    public userRoleService: UserRoleService,
    public router: Router,
    private location: Location,
    private snackBar: MatSnackBar,
    private store: Store<GlobalState>,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    // create the new form
    this.createUserRoleForm();
  }

  createUserRoleForm(): void {
    this.userRoleForm = this.fb.group({
      name: ['', {validators: [Validators.required, notBlankValidator()]}],
      description: [],
      active: [true],
      // organization permissions
      hasOrganizationView: [true],
      hasOrganizationCreate: [true],
      hasOrganizationEdit: [true],
      hasOrganizationDelete: [true],
      // account permissions
      hasAccountView: [true],
      hasAccountCreate: [true],
      hasAccountEdit: [true],
      hasAccountDelete: [true],
      // user permissions
      hasUserView: [true],
      hasUserCreate: [true],
      hasUserEdit: [true],
      hasUserDelete: [true],
      // user_role permissions
      hasUserRoleView: [true],
      hasUserRoleCreate: [true],
      hasUserRoleEdit: [true],
      hasUserRoleDelete: [true],
      // location permissions
      hasLocationView: [true],
      hasLocationCreate: [true],
      hasLocationEdit: [true],
      hasLocationDelete: [true],
    });
  }

  saveUserRole(): void {
    // get the form model
    const formModel = this.userRoleForm.value;
    // make a deep copy of he form
    const saveUserRole: UserRole = {
      name: formModel.name,
      description: formModel.description,
      active: true,
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
    this.userRoleService.create(saveUserRole).subscribe(
      (response: ResponseBase<UserRole>) => {
        console.log('got the response ', response);
        // set a success message
        this.snackBar.open('Successfully created the user role ' + response.object.name, null, {
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
        this.snackBar.open('Failed to save the user role ' + saveUserRole.name, null, {
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

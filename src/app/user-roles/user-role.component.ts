import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {UserRole} from './user-role';
import {PERMISSION_ARRAY_NAMES, PERMISSIONS_LIST} from './user-permission';
import {UserRoleService} from './user-role.service';

@Component({
    selector: 'app-user-role',
    templateUrl: './user-role.component.html',
    styleUrls: ['./user-role.component.scss']
})
export class UserRoleComponent implements OnInit {
    @Input() userRole: UserRole;
    // permissions = new UserPermissions();
    permissions = PERMISSIONS_LIST;
    isLoading = true;

    constructor(
        private userRoleService: UserRoleService,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location
    ) {
    }

    ngOnInit(): void {
        // check for a passed role
        if (this.userRole) {
            this.mapUserRole(this.userRole);
            this.isLoading = false;
        } else {
            // load it up from the request param
            const id = +this.route.snapshot.paramMap.get('id');
            // sanity check
            if (id) {
                // get the user by the id
                this.userRoleService.getUserRole(id).subscribe((userRole: UserRole) => {
                    this.userRole = userRole;
                    this.mapUserRole(userRole);
                    this.isLoading = false;
                });
            } else {
                // use an empty one
                this.userRole = {};
            }
        }
    }

    mapUserRole(role: UserRole) {
        // TODO: this is wildly unnecessary
        this.permissions[PERMISSION_ARRAY_NAMES.LOCATIONS].viewPermission.status = role.hasLocationView;
        this.permissions[PERMISSION_ARRAY_NAMES.LOCATIONS].createPermission.status = role.hasLocationCreate;
        this.permissions[PERMISSION_ARRAY_NAMES.LOCATIONS].editPermission.status = role.hasLocationEdit;
        this.permissions[PERMISSION_ARRAY_NAMES.LOCATIONS].deletePermission.status = role.hasLocationDelete;

        this.permissions[PERMISSION_ARRAY_NAMES.USERS].viewPermission.status = role.hasUserView;
        this.permissions[PERMISSION_ARRAY_NAMES.USERS].createPermission.status = role.hasUserCreate;
        this.permissions[PERMISSION_ARRAY_NAMES.USERS].editPermission.status = role.hasUserEdit;
        this.permissions[PERMISSION_ARRAY_NAMES.USERS].deletePermission.status = role.hasUserDelete;
    }

    goBack(): void {
        this.location.back();
    }
}

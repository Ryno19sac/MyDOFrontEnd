import {Component, Input} from '@angular/core';
import {UserRole} from "../user-roles/user-role";

@Component({
  selector: 'app-user-role-breadcrumb',
  templateUrl: './user-role-breadcrumb.component.html'
})
export class UserRoleBreadcrumbComponent {
  @Input() userRole?: UserRole;
  @Input() title?: string;

  // helper flags
  @Input() userRoles = false;
}

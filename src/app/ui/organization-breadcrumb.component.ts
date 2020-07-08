import {Component, Input} from '@angular/core';
import {Organization} from "../organizations/organization";

@Component({
  selector: 'app-organization-breadcrumb',
  templateUrl: './organization-breadcrumb.component.html'
})
export class OrganizationBreadcrumbComponent {
  @Input() organization?: Organization;
  @Input() title?: string;
}

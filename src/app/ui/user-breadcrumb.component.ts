import {Component, Input} from '@angular/core';
import {User} from '../users/user';
import {HasOrganization} from "../organizations/has-organization";
import {Store} from "@ngrx/store";
import {GlobalState} from "../+state/global.interfaces";

@Component({
    selector: 'biblioveda-app-user-breadcrumb',
    templateUrl: './user-breadcrumb.component.html'
})
export class UserBreadcrumbComponent extends HasOrganization {
    @Input() user?: User;
    @Input() title?: string;
    // helper flags
    @Input() userRoles = false;

    constructor(private store: Store<GlobalState>,) {
        // init the super class
        super(store);
    }
}

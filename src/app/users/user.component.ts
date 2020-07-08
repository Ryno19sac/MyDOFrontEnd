import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {UserService} from './user.service';
import {User} from './user';
import {AuthService} from '../auth/auth.service';
import {HasOrganization} from '../organizations/has-organization';
import {Store} from '@ngrx/store';
import {GlobalState} from '../+state/global.interfaces';

@Component({
    selector: 'MyDO-app-user',
    templateUrl: './user.component.html'
})
export class UserComponent extends HasOrganization implements OnInit {
    @Input() user: User;

    constructor(
        private userService: UserService,
        private store: Store<GlobalState>,
        public authService: AuthService,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location
    ) {
        // init the super class
        super(store);
    }

    ngOnInit(): void {
        // get the user id
        const userId = +this.route.snapshot.paramMap.get('userId');
        // get the organization id
    
        // this.userService.getUser(userId).subscribe((user: User) => {
        //     this.user = user;
        // });
    }

    goBack(): void {
        this.location.back();
    }
}

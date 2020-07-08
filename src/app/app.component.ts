import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {AuthService} from './auth/auth.service';
import {GlobalState} from "./+state/global.interfaces";
import {OrganizationUpdatedAction, UserUpdatedAction} from './+state/global.actions';
import {Organization} from './organizations/organization';

declare var Stripe: any;

@Component({
  selector: "MyDO-app-component",
  templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private store: Store<GlobalState>
  ){}

  ngOnInit(): void {

    
  }
}

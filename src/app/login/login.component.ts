import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth/auth.service';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {DestroySubscribers} from '../util/destroy-subscribers';
import {Subscription} from 'rxjs';
import {User} from "../users/user";

@Component({
  selector: 'MyDO-app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  message: string;
  loginForm: FormGroup;
  loginFailed: boolean;
  subscribers: {authSub: Subscription};
  id: number;

  constructor(
    public authService: AuthService,
    public router: Router,
    private fb: FormBuilder,
    // private iconRegistry: MatIconRegistry,
    // private sanitizer: DomSanitizer
  ) {
    this.subscribers = {authSub: null};
  }

  ngOnInit(): void {
    
    this.loginFailed = false;
    // create the login form
    console.log('call loginForm creation');
    this.createLoginForm();
  }

  createLoginForm() {
    console.log('create loginForm');
    this.loginForm = this.fb.group({
      email: ['', { validators: [Validators.required, Validators.email] }],
      password: ['', { validators: [Validators.required] }]
    });
    console.log('created loginForm',this.loginForm);
  }

  login(): void {
    this.message = 'Trying to log in ...';

    // login the user
    this.subscribers.authSub = this.authService.loginUser(this.loginForm.get('email').value, this.loginForm.get('password').value).subscribe(
      (user: User) => {
        console.log('got the user ', user);
        return this.router.navigate(['todo']);
      },
      err => {
        console.log('caught a login error', err);
        this.loginFailed = true;
      },
      () => {
        console.log('Completed');
      }
    );
  }

  logout(): void {
    this.authService.logout();
  }

  // getUserId(): number {
  //   this.id =  
  // }
}

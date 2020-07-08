import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from "../users/user.service";
import {Location} from "@angular/common";

@Component({
  selector: 'biblioveda-app-password-request',
  templateUrl: './password-request.component.html'
})
export class PasswordRequestComponent implements OnInit {
  message: string;
  requestForm: FormGroup;
  requestFailed: boolean;

  constructor(
    private userService: UserService,
    private router: Router,
    private location: Location,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.requestFailed = false;
    // create the request form
    this.createRequestForm();
  }

  createRequestForm() {
    this.requestForm = this.fb.group({
      email: ['', { validators: [Validators.required, Validators.email] }]
    });
  }

  requestPassword(): void {
    this.message = 'Trying to request password in ...';
    // request the reset
    this.userService.requestUserPassword(this.requestForm.get('email').value).subscribe(
      () => {
        console.log('password reset request made');
        //  send them to their desired page
        this.router.navigate(['/password/request/sent']);
      },
      err => {
        console.log('caught a request error', err);
        // TODO: we should have some sort of specific error code, but i suppose this works
        // as a catch all
        this.requestFailed = true;
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

import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Environment} from '../shared/environment';
import {Store} from '@ngrx/store';
import {GlobalState} from '../+state/global.interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Registration } from './registration';
import { RegistrationService } from './registration.service';
import { UserRegistration } from './user-registration';

@Component({
    selector: 'myo-app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
    registrationForm: FormGroup;

    constructor(
        private environment: Environment,
        private snackBar: MatSnackBar,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private registrationService: RegistrationService
    ) {
    }

    ngOnInit(): void { 
        this.registrationForm = this.fb.group({
            email: ['', { validators: [Validators.required, Validators.email] }],
            password: ['', { validators: [Validators.required] }]
          });
    }

    signIn(): void {
        const formModel = this.registrationForm.value;
        // create the form
        const saveRegistration: Registration = {
            username: formModel.email,
            password: formModel.password
        };
        const userRegistration: UserRegistration = {
            user: saveRegistration
        }
        this.registrationService.register(userRegistration).subscribe(
            (response: UserRegistration) => {
                // set a success message
                this.snackBar.open('Your account has been successfully created. Please Login.', null, {
                    panelClass: ['snackbar-success'],
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                    duration: this.environment.snackBarTimeout
                });
                // send them to login
                this.router.navigate(['/login']);
            },
            err => {
                this.snackBar.open('Error registering your account. Please contact customer support.', null, {
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

    
}

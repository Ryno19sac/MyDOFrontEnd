import {AfterViewInit, Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Environment} from "../shared/environment";
import {UserService} from "../users/user.service";
import {User} from "../users/user";
import {ResponseBase} from "../shared/model";
import {passwordConfirmValidator} from "../shared/validators/password-confirm-validator.directive";

@Component({
    selector: 'biblioveda-app-password-reset',
    templateUrl: './password-reset.component.html'
})
export class PasswordResetComponent implements AfterViewInit {
    // resetForm: FormGroup;
    // resetFailed: boolean;
    // user: User;
    // // indicate loading state
    // isLoading = true;
    // userId: number;
    // organizationId: number;
    // resetToken: string;

    constructor(
        private environment: Environment,
        private userService: UserService,
        public router: Router,
        public route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private fb: FormBuilder
    ) {
    }

    ngAfterViewInit(): void {
    //     // this.resetFailed = false;
    //     // // grab the keys from the request
    //     // this.userId = +this.route.snapshot.queryParamMap.get('slug_x');
    //     // this.organizationId = +this.route.snapshot.queryParamMap.get('slug_b');
    //     // this.resetToken = this.route.snapshot.queryParamMap.get('reset_token');
    //     // // Get the user from the token
    //     // this.userService.getUserFromResetToken(this.resetToken).subscribe(result => {
    //     //         this.user = result;
    //     //         // sanity check these (although at this point the user could fish these out of the console and fix their link)
    //     //         if ((this.userId !== result.id) || (this.organizationId !== result.organizationId)) {
    //     //             return this.failAndForward();
    //     //         }
    //     //         // create the reset form
    //     //         this.createResetForm();
    //     //         // end loading
    //     //         this.isLoading = false;
    //     //     },
    //     //     err => {
    //     //         console.log("got an error loading from reset token", err);
    //     //         // nope
    //     //         return this.failAndForward();
    //     //     });
    // }

    // failAndForward(): Promise<boolean> {
    //     this.snackBar.open("This reset password link was invalid. Please try again.", null, {
    //         panelClass: ["snackbar-error"],
    //         horizontalPosition: "center",
    //         verticalPosition: "top",
    //         duration: this.environment.snackBarTimeout
    //     });
    //     this.resetFailed = true;
    //     this.isLoading = false;
    //     // send back to password request
    //     return this.router.navigate(['/password/request']);
    // }

    // createResetForm() {
    //     this.resetForm = this.fb.group(
    //         {
    //             password: ['', {validators: [Validators.required]}],
    //             confirm: ['', {validators: [Validators.required]}]
    //         },
    //         {
    //             validator: passwordConfirmValidator('password', 'confirm')
    //         }
    //     );
    // }

    // resetPassword(): void {
    //     console.log('resetting the user password');
    //     // get the form model
    //     const formModel = this.resetForm.value;
    //     // make a deep copy of he form
    //     const user: User = {
    //         id: this.user.id,
    //         password: formModel.password,
    //         passwordResetToken: this.resetToken
    //     };
    //     // reset the user
    //     this.userService.resetUserPassword(user).subscribe(
    //         (result: ResponseBase<User>) => {
    //             console.log('got the password reset response ', result);
    //             // set a success message
    //             this.snackBar.open('Your password has been reset. Please login to continue', null, {
    //                 panelClass: ['snackbar-success'],
    //                 horizontalPosition: 'center',
    //                 verticalPosition: 'top',
    //                 duration: 6000
    //             });
    //             // send them to their desired page
    //             return this.router.navigate(['/login']);
    //         },
    //         err => {
    //             console.log('caught a reset error', err);
    //             this.snackBar.open('Your password could not be reset. Please contact support.', null, {
    //                 panelClass: ['snackbar-error'],
    //                 horizontalPosition: 'center',
    //                 verticalPosition: 'top',
    //                 duration: this.environment.snackBarTimeout
    //             });
    //             // as  catch all
    //             this.resetFailed = true;
    //         },
    //         () => {
    //             console.log('Completed');
    //         }
    //     );
    // }
}
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-logout',
  template: ''
})
export class LogoutComponent implements OnInit {
  message: string;
  loginForm: FormGroup;

  constructor(public authService: AuthService, public router: Router, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    // log the person out
    this.authService.logout();
    // send to the index
    window.location.href = `${environment.webUrl}/`;
  }
}

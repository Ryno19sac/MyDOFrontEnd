import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Data} from "../core/data.component";

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent {
    constructor(public authService: AuthService,
                private data: Data,
                public router: Router,
                private snackBar: MatSnackBar) {
    }

    login(): void {
        
        this.router.navigate(['/login']);
    }

    logout(): void {
        this.authService.logout();
    }
}

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {IndexComponent} from './index/index.component';
import {LoginComponent} from './login/login.component';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {JWT_OPTIONS, JwtModule} from '@auth0/angular-jwt';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LogoutComponent} from './login/logout.component';
import {AuthGuard} from './auth/auth.guard';
import {UsersModule} from './users/users.module';
import {PageNotFoundModule} from './page-not-found/page-not-found.module';
import {AuthService} from './auth/auth.service';
import {Router} from '@angular/router';
import {CoreModule} from './core/core.module';
import {AppComponent} from './app.component';
import {RoleGuard} from './auth/role.guard';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_LABEL_GLOBAL_OPTIONS} from '@angular/material/core';
import {MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {AppLayoutComponent} from './_layout/app-layout.component';
import {UIModule} from './ui/ui.module';
import {SharedModule} from './shared/shared.module';
import {Environment} from './shared/environment';
import {GlobalEffects} from './+state/global.effects';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {globalReducer} from './+state/global.reducer';
import {initialState} from './+state/global.init';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {NxModule} from '@nrwl/nx';
import {UserRolesModule} from './user-roles/user-roles.module';
import {OrganizationsModule} from "./organizations/organizations.module";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HttpErrorInterceptor} from "./shared/http-error.interceptor";
import {PasswordRequestComponent} from "./login/password-request.component";
import {PasswordRequestSentComponent} from "./login/password-request-sent.component";
import {PasswordResetComponent} from "./login/password-reset.component";
import {AppLayoutSlimComponent} from "./_layout/app-layout-slim.component";
import { RegistrationModule } from './registration/registration.module';
import { TodolistComponent } from './components/todolist/todolist.component';
import { RitualComponent } from './components/ritual/ritual.component';
import { NewsComponent } from './components/news/news.component';
import { JournalComponent } from './components/journal/journal.component';
import { StocksComponent } from './components/stocks/stocks.component';
import { BirthdaysComponent } from './components/birthdays/birthdays.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { TodoService } from './components/todolist/todolist.service';
import { RitualService } from './components/ritual/ritual.service';


// jwt config
export function jwtOptionsFactory() {
    return {
        tokenGetter: () => {
            return localStorage.getItem(AuthService.AUTH_TOKEN);
        },
        whitelistedDomains: [
            'localhost:3000',
            // 'herokuURL',
            
        ]
    }
}
@NgModule({
    imports: [
        BrowserModule,
        // JWT support
        JwtModule.forRoot({
            jwtOptionsProvider: {
                provide: JWT_OPTIONS,
                useFactory: jwtOptionsFactory
            }
        }),
        
        NxModule.forRoot(),
        StoreModule.forRoot({app: globalReducer}, {initialState}),
        EffectsModule.forRoot([GlobalEffects]),
        !environment.production ? StoreDevtoolsModule.instrument({
            maxAge: 25
        }) : [],
        // our stuff,
        AppRoutingModule,
        CoreModule,
        SharedModule,
        
        OrganizationsModule,
        UsersModule,
        UserRolesModule,
        UIModule,
        RegistrationModule,
        PageNotFoundModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatDatepickerModule
    ],
    declarations: [
        AppComponent,
        AppLayoutComponent,
        AppLayoutSlimComponent,
        DashboardComponent,
        IndexComponent,
        LoginComponent,
        LogoutComponent,
        PasswordRequestComponent,
        PasswordRequestSentComponent,
        PasswordResetComponent,
        TodolistComponent,
        RitualComponent,
        NewsComponent,
        JournalComponent,
        StocksComponent,
        BirthdaysComponent,
        // PageNotFoundComponent
    ],
    exports: [],
    bootstrap: [AppComponent],
    providers: [
        {provide: Environment, useValue: environment},
        {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
        {provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: {float: 'auto'}},
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
        {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true},
        AuthGuard,
        RoleGuard,
        AuthService,
        GlobalEffects,
        TodoService,
        RitualService
    ]
})
export class AppModule {
    constructor(router: Router) {
        
    }
}


import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LogoutComponent} from './login/logout.component';
import {AuthGuard} from './auth/auth.guard';
import {AppLayoutComponent} from "./_layout/app-layout.component";
import {AppLayoutSlimComponent} from "./_layout/app-layout-slim.component";
import { TodolistComponent } from './components/todolist/todolist.component';
import { JournalComponent } from './components/journal/journal.component';
import { NewsComponent } from './components/news/news.component';
import { StocksComponent } from './components/stocks/stocks.component';
import { RitualComponent } from './components/ritual/ritual.component';
import { BirthdaysComponent } from './components/birthdays/birthdays.component';


const routes: Routes = [
    { path: 'index', redirectTo: '/', pathMatch: 'full' },
    { path: '', component: AppLayoutSlimComponent,
        children: [
            { path: '', component: IndexComponent },
            { path: 'login', component: LoginComponent },
            { path: 'logout', component: LogoutComponent },
            
        ]
    },
    // everything else that is protected and within the full layout
    {
        path: '',
        component: AppLayoutComponent,
        children: [
            { path: 'todo', component: TodolistComponent},
            { path: 'rituals', component: RitualComponent},
            // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
            { path: 'journal', component: JournalComponent},
            { path: 'birthdays', component: BirthdaysComponent},
            { path: 'news', component: NewsComponent},
            { path: 'stocks', component: StocksComponent}
        ]
    },
    

    // other routes are defined in their respective modules

    // no route catchalls
    // otherwise redirect to not found
    // { path: '**', redirectTo: '' }
    // { path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

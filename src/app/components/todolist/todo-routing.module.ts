import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { TodolistComponent } from './todolist.component';
import { AppLayoutComponent } from '../../_layout/app-layout.component';
import { RitualComponent } from '../ritual/ritual.component';
import { NewsComponent } from '../news/news.component';
import { StocksComponent } from '../stocks/stocks.component';
import { JournalComponent } from '../journal/journal.component';
import { AuthGuard } from '../../auth/auth.guard';
import { BirthdaysComponent } from '../birthdays/birthdays.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: AppLayoutComponent,
    children: [
      {path: 'todo', component: TodolistComponent},
      {path: 'rituals', component: RitualComponent},
      {path: 'birthdays', component: BirthdaysComponent},
      {path: 'news', component: NewsComponent},
      {path: 'stock', component: StocksComponent},
      {path: 'journal', component: JournalComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodosRoutingModule {
}

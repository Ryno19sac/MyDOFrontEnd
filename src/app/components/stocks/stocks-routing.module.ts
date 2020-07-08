
import { AppLayoutComponent } from '../../_layout/app-layout.component';
import { NewsComponent } from '../news/news.component';
import { StocksComponent } from '../stocks/stocks.component';
import { JournalComponent } from '../journal/journal.component';
import { AuthGuard } from '../../auth/auth.guard';
import { TodolistComponent } from '../todolist/todolist.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: AppLayoutComponent,
    children: [
      {path: 'todo', component: TodolistComponent},
    //   {path: 'news', component: NewsComponent},
    //   {path: 'stock', component: StocksComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StocksRoutingModule {
}
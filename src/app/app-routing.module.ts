import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeagueWrapperComponent } from './league/league-wrapper/league-wrapper.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'league', component: LeagueWrapperComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

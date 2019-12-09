import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeagueComponent } from './league.component';
import { UserOverviewComponent } from './user-overview/user-overview.component';

const routes: Routes = [
  {
    path: '',
    component: LeagueComponent
  },
  {
    path: ':summonerName',
    component: UserOverviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeagueRoutingModule { }

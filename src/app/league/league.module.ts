import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeagueRoutingModule } from './league-routing.module';
import { LeagueComponent } from './league.component';
import { UserOverviewComponent } from './user-overview/user-overview.component';


@NgModule({
  declarations: [LeagueComponent, UserOverviewComponent],
  imports: [
    CommonModule,
    LeagueRoutingModule
  ]
})
export class LeagueModule { }

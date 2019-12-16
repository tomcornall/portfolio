import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

import { LeagueRoutingModule } from './league-routing.module';
import { LeagueComponent } from './league.component';
import { UserOverviewComponent } from './user-overview/user-overview.component';
import { MatchComponent } from './match/match.component';
import { TimeAgoPipe } from 'time-ago-pipe';
import { SecondsToTimePipe } from './seconds-to-time.pipe';

@NgModule({
  declarations: [LeagueComponent, UserOverviewComponent, MatchComponent, TimeAgoPipe, SecondsToTimePipe],
  imports: [
    CommonModule,
    LeagueRoutingModule,
    // FormsModule
  ]
})
export class LeagueModule { }

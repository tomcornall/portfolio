import { NgModule } from '@angular/core';

import { LeagueRoutingModule } from './league-routing.module';
import { LeagueComponent } from './league.component';
import { UserOverviewComponent } from './user-overview/user-overview.component';
import { MatchComponent } from './match/match.component';
import { TimeAgoPipe } from 'time-ago-pipe';
import { SecondsToTimePipe } from './seconds-to-time.pipe';

// Global components/directives shared among modules
import { SharedModule } from '../shared.module';

// Material:
import { MatCardModule, MatGridListModule, MatDividerModule } from '@angular/material';
import { DateSuffixPipe } from './date-suffix.pipe';

@NgModule({
  declarations: [LeagueComponent,
    UserOverviewComponent,
    MatchComponent,
    TimeAgoPipe,
    SecondsToTimePipe,
    DateSuffixPipe
  ],
  imports: [
    LeagueRoutingModule,
    SharedModule,
    MatCardModule,
    MatGridListModule,
    MatDividerModule,
  ]
})
export class LeagueModule { }

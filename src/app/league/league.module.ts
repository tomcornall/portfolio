import { NgModule } from '@angular/core';

import { LeagueRoutingModule } from './league-routing.module';
import { LeagueComponent } from './league.component';
import { UserOverviewComponent } from './user-overview/user-overview.component';
import { MatchComponent } from './match/match.component';
import { TimeAgoPipe } from 'time-ago-pipe';
import { SecondsToTimePipe } from './seconds-to-time.pipe';
import { DateSuffixPipe } from './date-suffix.pipe';

// Global components/directives shared among modules
import { SharedModule } from '../shared.module';

// Material:
import { MatCardModule, MatGridListModule, MatDividerModule, MatSlideToggleModule, MatToolbarModule } from '@angular/material';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { RankedInfoCardComponent } from './ranked-info-card/ranked-info-card.component';

@NgModule({
  declarations: [LeagueComponent,
    UserOverviewComponent,
    MatchComponent,
    TimeAgoPipe,
    SecondsToTimePipe,
    DateSuffixPipe,
    ToolbarComponent,
    RankedInfoCardComponent
  ],
  imports: [
    LeagueRoutingModule,
    SharedModule,
    MatCardModule,
    MatGridListModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatToolbarModule
  ]
})
export class LeagueModule { }

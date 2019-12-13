import { Component, OnInit, Input } from '@angular/core';
import { LeagueApiService } from '../league-api.service';
import { MatchlistMatch } from '../matchlist-match';
import * as Queues from '../../../assets/queues.json';
import { Match } from '../match';
import { Account } from '../account';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {
  @Input() matchlistMatch: MatchlistMatch;
  @Input() account: Account;
  match: Match;

  constructor(
    private leagueApiService: LeagueApiService,
  ) { }

  ngOnInit() {
    this.leagueApiService.getMatch(this.matchlistMatch.gameId)
      .subscribe(
        match => {
          this.match = match;
          console.log('got match: ');
          console.log(match);
          this.setupMatchData(this.match);
        }
      );
  }

  setupMatchData(match: Match) {
    match.type = Queues.array.find(queue => queue.queueId === match.queueId).description;

    const championId = this.matchlistMatch.champion;

    const winningTeamId = match.teams.find(team => team.win === "Win").teamId;

    console.log(winningTeamId);
    const participantIdentity = match.participantIdentities.find(participantIdentity => participantIdentity.player.accountId === this.account.accountId);
    const participant = match.participants.find(participant => participant.participantId === participantIdentity.participantId);

    match.result = (participant.teamId === winningTeamId) ? 'Victory' : 'Defeat';

  }

}

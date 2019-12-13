import { Component, OnInit, Input } from '@angular/core';
import { LeagueApiService } from '../league-api.service';
import { MatchlistMatch } from '../matchlist-match';
import * as Queues from '../../../assets/queues.json';
import * as Champions from '../../../assets/champion.json';
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
  mainParticipant: any;

  constructor(
    private leagueApiService: LeagueApiService,
  ) { }

  ngOnInit() {
    this.leagueApiService.getMatch(this.matchlistMatch.gameId)
      .subscribe(
        match => {
          console.log('got match: ');
          console.log(match);
          this.setupMatchData(match);
        }
      );
  }

  setupMatchData(match: Match) {
    match.type = Queues.data.find(queue => queue.queueId === match.queueId).description;

    // const championId = this.matchlistMatch.champion;

    // const winningTeamId = match.teams.find(team => team.win === "Win").teamId;

    // const champion = Champions.data.find(champion => champion.key === championId);
    match.team1Participants = [];
    match.team2Participants = [];
console.log('team1 & 2');
  console.log(match.team1Participants);
  console.log(match.team1Participants);
    // Mapping Identities, Teams, and Champions to participants
    match.participants.forEach(participant => {
      participant.participantIdentity = match.participantIdentities.find(participantIdentity => participantIdentity.participantId === participant.participantId);
      participant.team = match.teams.find(team => team.teamId === participant.teamId);
      participant.champion = Champions.data.find(champion => champion.key == participant.championId); // using "==" since one is a string while the other number
      participant.mainParticipant = (participant.participantIdentity.player.accountId === this.account.accountId)? true : false;

      if (participant.mainParticipant === true) {
        this.mainParticipant = participant;
        match.result = (participant.stats.win) ? 'Victory' : 'Defeat';
      }

      if (participant.teamId === 100) {
        match.team1Participants.push(participant);
      } else {
        match.team2Participants.push(participant);
      }
    });

    console.log(match.team1Participants);

    const order = {
      "TOP": 1,
      "JUNGLE": 2,
      "MIDDLE": 3,
      "BOTTOM": 4
    };

    function compare(a, b) {
      let aValue = order[a.timeline.lane];
      let bValue = order[b.timeline.lane];

      if (aValue < bValue) {
        return -1;
      }
      if (aValue > bValue) {
        return 1;
      }

      // a must be equal to b
      if (a.stats.totalMinionsKilled > b.stats.totalMinionsKilled) {
        return -1;
      } else {
        return 1;
      }
    }

    // sort participants...
    match.team1Participants.sort(compare);
    match.team2Participants.sort(compare);

    this.match = match;
  }

}

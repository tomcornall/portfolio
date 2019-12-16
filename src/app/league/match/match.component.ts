import { Component, OnInit, Input } from '@angular/core';
import { LeagueApiService } from '../league-api.service';
import { MatchlistMatch } from '../matchlist-match';
import * as Queues from '../../../assets/queues.json';
import * as Champions from '../../../assets/champion.json';
import * as SummonerSpells from '../../../assets/summoner.json';
import * as Perks from '../../../assets/perks.json';
import * as Runes from '../../../assets/runesReforged.json';
import * as Items from '../../../assets/item.json';
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
  background: any;

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

    // const champion = Champions.data.find(champion => champion.key === championId);
    match.team1Participants = [];
    match.team2Participants = [];

    // Mapping Identities, Teams, and Champions, Summoner Spells to participants
    match.participants.forEach(participant => {
      participant.participantIdentity = match.participantIdentities.find(participantIdentity => participantIdentity.participantId === participant.participantId);
      participant.team = match.teams.find(team => team.teamId === participant.teamId);
      participant.champion = Champions.data.find(champion => champion.key == participant.championId); // using "==" since one is a string while the other number
      participant.mainParticipant = (participant.participantIdentity.player.accountId === this.account.accountId)? true : false;
      participant.spell1 = SummonerSpells.data[participant.spell1Id];
      participant.spell2 = SummonerSpells.data[participant.spell2Id];

      participant.spell1Style = {
        'background': `url('../../../assets/sprite/tiny_${participant.spell1.image.sprite}') -${participant.spell1.image.x / 2}px -${participant.spell1.image.y / 2}px`,
        'width': `${participant.spell1.image.w / 2}px`,
        'height': `${participant.spell1.image.h / 2}px`,
      };
      participant.spell2Style = {
        'background': `url('../../../assets/sprite/tiny_${participant.spell2.image.sprite}') -${participant.spell2.image.x / 2}px -${participant.spell2.image.y / 2}px`,
        'width': `${participant.spell2.image.w / 2}px`,
        'height': `${participant.spell2.image.h / 2}px`,
      };

      // primaryRunes = Runes.data.find(rune => rune.id === participant.stats.perkPrimaryStyle)

      participant.perk0Image = 'https://ddragon.leagueoflegends.com/cdn/img/' + Perks.data.find(rune => rune.id === participant.stats.perk0).iconPath;
      participant.perk1Image = 'https://ddragon.leagueoflegends.com/cdn/img/' + Perks.data.find(rune => rune.id === participant.stats.perk1).iconPath;
      participant.perk2Image = 'https://ddragon.leagueoflegends.com/cdn/img/' + Perks.data.find(rune => rune.id === participant.stats.perk2).iconPath;
      participant.perk3Image = 'https://ddragon.leagueoflegends.com/cdn/img/' + Perks.data.find(rune => rune.id === participant.stats.perk3).iconPath;
      participant.perk4Image = 'https://ddragon.leagueoflegends.com/cdn/img/' + Perks.data.find(rune => rune.id === participant.stats.perk4).iconPath;
      participant.perk5Image = 'https://ddragon.leagueoflegends.com/cdn/img/' + Perks.data.find(rune => rune.id === participant.stats.perk5).iconPath;
      // participant.perk2Image = 'https://ddragon.leagueoflegends.com/cdn/img/' + Perks.data.find(rune => rune.id === participant.stats.perk2).iconPath;

      participant.perkSubStyleImage = 'https://ddragon.leagueoflegends.com/cdn/img/' + Runes.data.find(rune => rune.id === participant.stats.perkSubStyle).icon;

      participant.kda = (participant.stats.kills + participant.stats.assists) / participant.stats.deaths;
      participant.cs = participant.stats.totalMinionsKilled + participant.stats.neutralMinionsKilled;
      participant.csPerMin = participant.cs / (match.gameDuration / 60);

      // items
      for (let index = 0; index < 6; index++) {
        console.log(index);
        let string = participant.stats["item" + index.toString()];
        if (string) {
          string = string.toString();
          // participant.item0Image = '../../../assets/item/' + Items.data[string].image.full;
          participant["item" + index.toString() + "Image"] = '../../../assets/item/' + Items.data[string].image.full;
        }
      }

      // done mapping participants. Can assign them now.
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

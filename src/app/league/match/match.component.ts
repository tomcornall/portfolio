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
          this.setupMatchData(match);
        }
      );
  }

  setupMatchData(match: Match) {
    match.type = Queues.data.find(queue => queue.queueId === match.queueId).description;

    // Custom stats:
    match.team1Kills = 0;
    match.team2Kills = 0;
    match.team1Participants = [];
    match.team2Participants = [];

    // Team specific stats have to go first
    this.countTeamKills(match);

    // Mapping Identities, Teams, and Champions, Summoner Spells to participants
    match.participants.forEach(participant => {
      participant.participantIdentity = match.participantIdentities.find(participantIdentity => participantIdentity.participantId === participant.participantId);
      participant.team = match.teams.find(team => team.teamId === participant.teamId);
      participant.champion = Champions.data.find(champion => champion.key == participant.championId); // using "==" since one is a string while the other number
      participant.mainParticipant = (participant.participantIdentity.player.accountId === this.account.accountId)? true : false;

      // Spell Images:
      // TODO: Sprite abstract function
      for (let index = 1; index <= 2; index++) {
        participant["spell" + index] = SummonerSpells.data[participant["spell" + index + "Id"]];

        let spriteDiscreteX = 10;
        let spriteDiscreteY = 4;
        let incrementX = 100 / (spriteDiscreteX - 1);
        let incrementY = 100 / (spriteDiscreteY - 1);

        let positionX = participant["spell" + index].image.x / participant["spell" + index].image.w * incrementX;
        let positionY = participant["spell" + index].image.y / participant["spell" + index].image.h * incrementY;

        participant["spell" + index + "Style"] = {
          'background': `url('../../../assets/sprite/tiny_${participant["spell" + index].image.sprite}') ${positionX}% ${positionY}%`,
          'background-size': '1000%'
        };
      }

      // primaryRunes = Runes.data.find(rune => rune.id === participant.stats.perkPrimaryStyle)

      // TODO: for loop
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

      // Item images
      // TODO: Sprite abstract function
      for (let index = 0; index < 7; index++) {
        // let key = index.toString();
        let itemKey = participant.stats["item" + index];

        if (itemKey) {
          itemKey = itemKey.toString();

          let spriteDiscreteX = 10;
          let spriteDiscreteY = 10;

          let spriteFile = Items.data[itemKey].image.sprite;

          if (spriteFile === "item2.png") {
            spriteDiscreteY = 6;
          }

          let incrementX = 100 / (spriteDiscreteX - 1);
          let incrementY = 100 / (spriteDiscreteY - 1);

          let positionX = Items.data[itemKey].image.x / Items.data[itemKey].image.w * incrementX;
          let positionY = Items.data[itemKey].image.y / Items.data[itemKey].image.h * incrementY;

          participant["item" + index + "Style"] = {
            'background': `url('../../../assets/sprite/${spriteFile}') ${positionX}% ${positionY}%`,
            'background-size': '1000%'
          };
        }
      }

      if (participant.teamId === 100) {
        participant.kp = participant.stats.kills / match.team1Kills * 100;
      } else {
        participant.kp = participant.stats.kills / match.team2Kills * 100;
      }

      if (participant.timeline.lane === "BOTTOM") {
        let otherBottom = match.participants.find(p => p.timeline.lane === "BOTTOM" && participant.participantId !== p.participantId);
        if (participant.stats.totalMinionsKilled < otherBottom.stats.totalMinionsKilled) {
          participant.timeline.lane = "SUPPORT";
        }
      }

      if (participant.timeline.lane === "MIDDLE") {
        participant.timeline.lane = "MID";
      }

      // Setup role icon:
      if (participant.timeline.lane === "NONE") {
        participant.roleIconSource = "";
      } else {
        participant.roleIconSource = `../../../assets/${participant.timeline.lane}.svg`;
      }

      // done mapping participants. Can assign them now.
      if (participant.mainParticipant === true) {
        this.mainParticipant = participant;
        match.result = (participant.stats.win) ? 'Victory' : 'Defeat';
      }
    });

    this.groupTeams(match);

    this.match = match;
  }

  countTeamKills(match: Match) {
    match.participants.forEach(participant => {
      if (participant.teamId === 100) {
        match.team1Kills += participant.stats.kills;
      } else {
        match.team2Kills += participant.stats.kills;
      }
    });
  }

  groupTeams(match: Match) {
    match.participants.forEach(participant => {
      if (participant.teamId === 100) {
        match.team1Participants.push(participant);
      } else {
        match.team2Participants.push(participant);
      }
    });

    this.sortTeams(match.team1Participants);
    this.sortTeams(match.team2Participants);
  }

  sortTeams(teamParticipants) {
    const order = {
      "TOP": 1,
      "JUNGLE": 2,
      "MID": 3,
      "BOTTOM": 4,
      "SUPPORT": 5
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

      if (a.stats.totalMinionsKilled > b.stats.totalMinionsKilled) {
        return -1;
      } else {
        return 1;
      }
    }

    teamParticipants.sort(compare);
  }
}

import { Component, OnInit, Input, HostListener } from '@angular/core';
import { LeagueApiService } from '../league-api.service';
import { MatchlistMatch } from '../matchlist-match';
import * as Queues from '../../../assets/queues.json';
import * as Champions from '../../../assets/champion2.json';
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
  matchCardColumns: number;
  showChampions: boolean;
  positionIcons = [
    "../../../assets/positions/top-position-icon.svg",
    "../../../assets/positions/jungle-position-icon.svg",
    "../../../assets/positions/mid-position-icon.svg",
    "../../../assets/positions/bottom-position-icon.svg",
    "../../../assets/positions/support-position-icon.svg"
  ];

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

    this.setMatchCardColumns();
  }

  /**
   * Window resize listener function
   */
  @HostListener('window:resize') private setMatchCardColumns(): void {
    if (window.innerWidth <= 800) {
      this.showChampions = false;
      this.matchCardColumns = 3;
    } else {
      this.showChampions = true;
      this.matchCardColumns = 5;
    }
  }

  /**
   * Sets up data used for displaying a match:
   *   - spell images (url/size)
   *   - teams 1 and 2 in a sorted order
   *   - item images
   *   - various
   */
  private setupMatchData(match: Match) {
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
      // General player stats
      participant.participantIdentity = match.participantIdentities.find(participantIdentity => participantIdentity.participantId === participant.participantId);
      participant.team = match.teams.find(team => team.teamId === participant.teamId);
      participant.champion = Champions.data.find(champion => champion.key == participant.championId); // using "==" since one is a string while the other number
      participant.mainParticipant = (participant.participantIdentity.player.accountId === this.account.accountId)? true : false;
      participant.kda = (participant.stats.kills + participant.stats.assists) / participant.stats.deaths;
      participant.cs = participant.stats.totalMinionsKilled + participant.stats.neutralMinionsKilled;
      participant.csPerMin = participant.cs / (match.gameDuration / 60);

      if (participant.teamId === 100) {
        participant.kp = participant.stats.kills / match.team1Kills * 100;
      } else {
        participant.kp = participant.stats.kills / match.team2Kills * 100;
      }

      // format summoner name:
      participant.formattedSummonerName = participant.participantIdentity.player.summonerName;
      console.log(participant.formattedSummonerName);
      console.log(participant.formattedSummonerName.length);

      if (participant.formattedSummonerName.length > 12) {
        participant.formattedSummonerName = participant.formattedSummonerName.slice(0,12);
        console.log(participant.formattedSummonerName);
        participant.formattedSummonerName += '...';
        console.log(participant.formattedSummonerName);
      }

      // Spell Images:
      // TODO: abstract out
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

      // Rune Images:
      // TODO: for loop & abstract out
      participant.perk0Image = 'https://ddragon.leagueoflegends.com/cdn/img/' + Perks.data.find(rune => rune.id === participant.stats.perk0).iconPath;
      participant.perk1Image = 'https://ddragon.leagueoflegends.com/cdn/img/' + Perks.data.find(rune => rune.id === participant.stats.perk1).iconPath;
      participant.perk2Image = 'https://ddragon.leagueoflegends.com/cdn/img/' + Perks.data.find(rune => rune.id === participant.stats.perk2).iconPath;
      participant.perk3Image = 'https://ddragon.leagueoflegends.com/cdn/img/' + Perks.data.find(rune => rune.id === participant.stats.perk3).iconPath;
      participant.perk4Image = 'https://ddragon.leagueoflegends.com/cdn/img/' + Perks.data.find(rune => rune.id === participant.stats.perk4).iconPath;
      participant.perk5Image = 'https://ddragon.leagueoflegends.com/cdn/img/' + Perks.data.find(rune => rune.id === participant.stats.perk5).iconPath;
      // participant.perk2Image = 'https://ddragon.leagueoflegends.com/cdn/img/' + Perks.data.find(rune => rune.id === participant.stats.perk2).iconPath;
      participant.perkSubStyleImage = 'https://ddragon.leagueoflegends.com/cdn/img/' + Runes.data.find(rune => rune.id === participant.stats.perkSubStyle).icon;

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

      // Player Roles
      if (participant.timeline.lane === "BOTTOM") {
        let otherBottom = match.participants.find(p => p.timeline.lane === "BOTTOM" && participant.participantId !== p.participantId);
        if (otherBottom) {
          if (participant.stats.totalMinionsKilled < otherBottom.stats.totalMinionsKilled) {
            participant.timeline.lane = "SUPPORT";
          }
        }
      }

      if (participant.timeline.lane === "MIDDLE") {
        participant.timeline.lane = "MID";
      }

      // Role icon
      if (participant.timeline.lane === "NONE") {
        participant.roleIconSource = "";
      } else {
        participant.roleIconSource = `../../../assets/${participant.timeline.lane}.svg`;
      }

      // Done mapping participants
      // Assign them now:
      if (participant.mainParticipant === true) {
        this.mainParticipant = participant;
        match.result = (participant.stats.win) ? 'Victory' : 'Defeat';
      }
    });

    this.groupTeams(match);

    this.match = match;
  }

  private countTeamKills(match: Match) {
    match.participants.forEach(participant => {
      if (participant.teamId === 100) {
        match.team1Kills += participant.stats.kills;
      } else {
        match.team2Kills += participant.stats.kills;
      }
    });
  }

  /**
   * Groups participants into Team 1 and Team 2
   */
  private groupTeams(match: Match) {
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

  /**
   * Sorts participants in a team into order based on position in the game (top, jungle, etc.)
   */
  private sortTeams(teamParticipants) {
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

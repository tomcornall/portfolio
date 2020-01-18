import { Component, OnInit } from '@angular/core';
import { RankedEntry } from '../ranked-entry';
import { LeagueApiService } from '../league-api.service';
import { Account } from '../account';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Matchlist } from '../matchlist';
import { MatchlistMatch } from '../matchlist-match';
import { ThemeService } from '../theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss']
})
export class UserOverviewComponent implements OnInit {
  rankedSoloQueue: RankedEntry;
  rankedFlexSR: RankedEntry;
  rankedFlexTT: RankedEntry;
  account: Account;
  profileIconSource: string;
  defaultProfileIconSource: string;
  prestigeCrestSource: string;
  defaultPrestigeCrestSource: string;
  matchlist: Matchlist;
  matchlistMatches: MatchlistMatch[];
  isLightTheme: Observable<boolean>;
  prestigeCrestIds = [
    1,
    30,
    50,
    75,
    100,
    125,
    150,
    175,
    200,
    225,
    250,
    275,
    300,
    325,
    350,
    375,
    400,
    425,
    450,
    475,
    500
  ];

  constructor(
    private leagueApiService: LeagueApiService,
    private route: ActivatedRoute,
    private router: Router,
    private themeService: ThemeService
  ) {
    this.defaultProfileIconSource = "/assets/profileicon/23.png";
    this.defaultPrestigeCrestSource = "/assets/prestige-crests/1.png"
  }

  ngOnInit() {
    this.isLightTheme = this.themeService.isLightTheme;

    this.route.params.pipe(
      switchMap(params => {
        return this.leagueApiService.getAccount(params.summonerName);
      })
    ).subscribe(
      account => {
        this.account = account;
        this.setupProfileIcon(account.profileIconId, account.summonerLevel);
        this.setupUser(account.id);
        this.setupMatches(account.accountId);
      }
    );
  }

  setupMatches(accountId: string) {
    this.leagueApiService.getMatchlist(accountId)
      .subscribe(
        matchlist => {
          this.matchlist = matchlist;
          this.matchlistMatches = matchlist.matches;
        }
      )
  }

  setupUser(id: string) {
    this.leagueApiService.getRankedEntries(id)
      .subscribe(
        rankedEntries => {
          rankedEntries.forEach(entry => {
            switch (entry.queueType) {
              case "RANKED_SOLO_5x5":
                this.rankedSoloQueue = entry;
                this.rankedSoloQueue.cardName = "Ranked Solo";
                this.setupRankedData(this.rankedSoloQueue);
                break;
              case "RANKED_FLEX_SR":
                this.rankedFlexSR = entry;
                this.rankedFlexSR.cardName = "Flex 5v5";
                this.setupRankedData(this.rankedFlexSR);
                break;
              case "RANKED_FLEX_TT":
                this.rankedFlexTT = entry;
                this.rankedFlexTT.cardName = "Flex 3v3";
                this.setupRankedData(this.rankedFlexTT);
                break;
              default:
                // nothing to do
                break;
            }
          });
        }
      );
  }

  setupRankedData(entry: RankedEntry) {
    entry.emblemImageSource = `/assets/ranked-emblems/Emblem_${entry.tier}.png`;

    if (entry.losses) {
      entry.winrate = entry.wins / (entry.wins + entry.losses) * 100;
    } else {
      entry.winrate = 100;
    }

    if (entry.winrate < 50) {
      entry.badWinrate = true;
    }
  }

  setupProfileIcon(profileIconId: number, summonerLevel: number) {
    this.profileIconSource = `/assets/profileicon/${profileIconId}.png`;

    let crestId = 1;

    this.prestigeCrestIds.forEach(id => {
      if (summonerLevel >= id) {
        crestId = id;
      }
    });

    this.prestigeCrestSource = `/assets/prestige-crests/${crestId}.png`;
  }

  onSubmit(nameInput: string) {
    console.log('###SUBMITTED: '+nameInput);
    this.router.navigate([`/league/${nameInput}`]);
  }
}

import { Component, OnInit } from '@angular/core';
import { RankedEntry } from '../ranked-entry';
import { LeagueApiService } from '../league-api.service';
import { Account } from '../account';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Matchlist } from '../matchlist';
import { MatchlistMatch } from '../matchlist-match';

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
  matchlist: Matchlist;
  matchlistMatches: MatchlistMatch[];

  constructor(
    private leagueApiService: LeagueApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.defaultProfileIconSource = `/assets/profileicon/23.png`;
  }

  ngOnInit() {
    this.route.params.pipe(
      switchMap(params => {
        return this.leagueApiService.getAccount(params.summonerName);
      })
    ).subscribe(
      account => {
        console.log('got account!###');
        console.log(account);
        this.account = account;
        this.setupProfileIcon(account.profileIconId);
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
                this.setupRankedData(this.rankedSoloQueue);
                break;
              case "RANKED_FLEX_SR":
                this.rankedFlexSR = entry;
                this.setupRankedData(this.rankedFlexSR);
                break;
              case "RANKED_FLEX_TT":
                this.rankedFlexTT = entry;
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
  }

  setupProfileIcon(profileIconId: number) {
    this.profileIconSource = `/assets/profileicon/${profileIconId}.png`;
  }

  onSubmit(nameInput: string) {
    console.log('###SUBMITTED: '+nameInput);
    this.router.navigate([`/league/${nameInput}`]);
  }
}

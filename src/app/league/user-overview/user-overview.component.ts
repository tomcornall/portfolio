import { Component, OnInit } from '@angular/core';
import { RankedEntry } from '../ranked-entry';
import { RankedEntriesService } from '../ranked-entries.service';
import { Account } from '../account';
import { PlayedChampion } from '../playedChampion';
import { AccountService } from '../account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

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
  mostPlayedChampions: PlayedChampion[];

  constructor(
    private rankedEntriesService: RankedEntriesService,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.pipe(
      switchMap(params => {
        return this.accountService.getAccount(params.summonerName);
      })
    ).subscribe(
      account => {
        this.account = account;
        this.setupProfileIcon(account.profileIconId);
        this.setupUser(account.id);
      }
    );
  }

  setupUser(id: string) {
    this.rankedEntriesService.getRankedEntries(id)
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
                // do nothing
                break;
            }
          });
        }
      );
  }

  setupRankedData(entry: RankedEntry) {
    entry.emblemImageSource = `/assets/ranked-emblems/Emblem_${entry.tier}.png`;
    entry.winrate = entry.wins / (entry.wins + entry.losses) * 100;
  }

  setupProfileIcon(profileIconId: number) {
    this.profileIconSource = `/assets/profileicon/${profileIconId}.png`;
  }

  onSubmit(nameInput: string) {
    console.log('###SUBMITTED: '+nameInput);
    this.router.navigate([`/league/${nameInput}`]);
  }
}

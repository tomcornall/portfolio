import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Account } from '../account';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss']
})
export class UserOverviewComponent implements OnInit {
  user: User;
  account: Account;
  summonerName: string;
  rankedEmblemSource: string;

  constructor(
    private userService: UserService,
    private accountService: AccountService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // Find summonName URL parameter
    this.route.queryParams.subscribe(
      (params => {
        this.getUser(params.summonerName);
      }
    ));
  }

  getUser(summonerName: string): void {
    this.accountService.getAccount(summonerName)
      .subscribe(account => {
        this.account = account;
        this.getUserFromAccountId(account.id);
      });
  }

  getUserFromAccountId(id: string): void {
    this.userService.getUser(this.account.id)
      .subscribe(user => {
        this.user = user[0];
        this.setupRankedEmblem(this.user.tier);
      });
  }

  setupRankedEmblem(tier: string) {
    this.rankedEmblemSource = `/assets/ranked-emblems/Emblem_${tier}.png`;
  }

}

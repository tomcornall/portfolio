import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Account } from '../account';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';
import { switchMap } from 'rxjs/operators';

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
  profileIconSource: string;

  constructor(
    private userService: UserService,
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
    this.userService.getUser(id)
      .subscribe(
        user => {
          this.user = user[0];
          this.setupRankedEmblem(this.user.tier);
        }
      );
  }

  setupRankedEmblem(tier: string) {
    this.rankedEmblemSource = `/assets/ranked-emblems/Emblem_${tier}.png`;
  }

  setupProfileIcon(profileIconId: number) {
    this.profileIconSource = `/assets/profileicon/${profileIconId}.png`;
  }

  onSubmit(nameInput: string) {
    console.log('###SUBMITTED: '+nameInput);
    this.router.navigate([`/league/${nameInput}`]);
  }
}

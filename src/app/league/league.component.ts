import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.scss']
})
export class LeagueComponent implements OnInit {
  submitted = false;
  isLightTheme: Observable<boolean>;

  constructor(
    private router: Router,
    private themeService: ThemeService
  ) { }

  onSubmit(nameInput: string) {
    console.log('###SUBMITTED: '+nameInput);
    this.submitted = true;
    this.router.navigate([`/league/${nameInput}`]);
  }

  ngOnInit() {
    this.isLightTheme = this.themeService.isLightTheme;
  }

}

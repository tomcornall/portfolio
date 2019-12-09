import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.scss']
})
export class LeagueComponent implements OnInit {
  submitted = false;

  constructor(
    private router: Router
  ) { }

  onSubmit(nameInput: string) {
    console.log('###SUBMITTED: '+nameInput);
    this.submitted = true;
    this.router.navigate([`/league/${nameInput}`]);
  }

  ngOnInit() {
  }

}

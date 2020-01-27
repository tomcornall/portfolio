import { Component, OnInit, Input } from '@angular/core';
import { ThemeService } from '../theme.service';
import { Observable } from 'rxjs';
import { RankedEntry } from '../ranked-entry';

@Component({
  selector: 'app-ranked-info-card',
  templateUrl: './ranked-info-card.component.html',
  styleUrls: ['./ranked-info-card.component.scss']
})
export class RankedInfoCardComponent implements OnInit {
  @Input() entry: RankedEntry;
  @Input() cardName: string;
  entryDone: RankedEntry;
  isLightTheme: Observable<boolean>;

  constructor(
    private themeService: ThemeService
  ) { }

  ngOnInit() {
    this.isLightTheme = this.themeService.isLightTheme;

    this.setupRankedData();
  }

  /**
   * Builds extra entry data pieces:
   *   - entry.emblemImageSource
   *   - entry.winrate
   */
  private setupRankedData() {
    this.entry.emblemImageSource = `/assets/ranked-emblems/Emblem_${this.entry.tier}.png`;

    if (this.entry.losses) {
      this.entry.winrate = this.entry.wins / (this.entry.wins + this.entry.losses) * 100;
    } else {
      this.entry.winrate = 100;
    }

    if (this.entry.winrate < 50) {
      this.entry.badWinrate = true;
    }
  }
}

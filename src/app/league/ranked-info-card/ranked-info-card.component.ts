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
  @Input() rankedEntry: RankedEntry;
  @Input() cardName: string;
  entryDone: RankedEntry;
  isLightTheme: Observable<boolean>;

  constructor(
    private themeService: ThemeService
  ) { }

  ngOnInit() {
    this.isLightTheme = this.themeService.isLightTheme;
    console.log('###testing entry...');
    console.log(this.rankedEntry);
    if (this.rankedEntry) {
      console.log('###got rankedEntry!');
      console.log(this.rankedEntry);
      this.setupRankedData(this.rankedEntry);
    }
  }

  /**
   * Builds extra entry data pieces:
   *   - entry.emblemImageSource
   *   - entry.winrate
   */
  private setupRankedData(entry: RankedEntry) {
    entry.emblemImageSource = `/assets/ranked-emblems/Emblem_${entry.tier}.png`;

    if (entry.losses) {
      entry.winrate = entry.wins / (entry.wins + entry.losses) * 100;
    } else {
      entry.winrate = 100;
    }

    if (entry.winrate < 50) {
      entry.badWinrate = true;
    }

    this.entryDone = entry;
  }
}

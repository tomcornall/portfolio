import { Component, OnInit, Input } from '@angular/core';
import { MatchService } from '../match.service';
import { MatchlistMatch } from '../matchlist-match';
import * as Queues from '../../../assets/queues.json';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {
  @Input() match: MatchlistMatch;

  constructor(
    private matchService: MatchService,
  ) { }

  ngOnInit() {
    this.matchService.getMatchTimeline(this.match.gameId)
      .subscribe(
        matchTimeline => {
          this.match.timeline = matchTimeline;
          this.setupMatchData(this.match);
        }
      );
  }

  setupMatchData(match: MatchlistMatch) {
    match.type = Queues.array.find(queue => queue.queueId === match.queue).description;
  }

}

import { MatchTimeline } from './match-timeline';
import { Match } from './match';

export class MatchlistMatch {
    lane: string;
    gameId: number;
    champion: string;
    platformId: string;
    timestamp: string;
    queue: number;
    role: string;
    season: number;
    timeline: MatchTimeline;
    match: Match;
    last?: boolean;
}
import { MatchTimeline } from './match-timeline';

export class MatchlistMatch {
    lane: string;
    gameId: number;
    champion: number;
    platformId: string;
    timestamp: number;
    queue: number;
    role: string;
    season: number;
    timeline: MatchTimeline;
    type?: string;
}
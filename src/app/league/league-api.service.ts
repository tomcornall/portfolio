import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Matchlist } from './matchlist';
import { tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { MatchTimeline } from './match-timeline';
import { Match } from './match';
import { Account } from './account';
import { RankedEntry } from './ranked-entry';

@Injectable({
  providedIn: 'root'
})
export class LeagueApiService {
  private readonly url: string = 'https://4fc2bs5006.execute-api.us-west-2.amazonaws.com/default/leagueAPIGateway';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    params: new HttpParams()
      .set('token', 'RGAPI-7095e39b-ceeb-4115-93d8-cd9b74298669')
  };

  constructor(
    private http: HttpClient
  ) { }

  getMatchlist(id: string, count): Observable<Matchlist> {
    this.httpOptions.params = this.httpOptions.params.set('endpoint', `/lol/match/v4/matchlists/by-account/${id}?endIndex=${count}`);

    return this.http.get<Matchlist>(this.url, this.httpOptions).pipe(
      tap(_ => console.log(`fetched Matchlist id=${id}`)),
      catchError(this.handleError<Matchlist>(`getMatchlist id=${id}`))
    );
  }

  getMatch(id: number): Observable<Match> {
    this.httpOptions.params = this.httpOptions.params.set('endpoint', `/lol/match/v4/matches/${id}`);

    return this.http.get<Match>(this.url, this.httpOptions).pipe(
      tap(_ => console.log(`fetched Match id=${id}`)),
      catchError(this.handleError<Match>(`getMatch id=${id}`))
    );
  }

  getMatchTimeline(matchId: number): Observable<MatchTimeline> {
    this.httpOptions.params = this.httpOptions.params.set('endpoint', `/lol/match/v4/timelines/by-match/${matchId}`);

    return this.http.get<MatchTimeline>(this.url, this.httpOptions).pipe(
      tap(_ => console.log(`fetched MatchTimeline matchId=${matchId}`)),
      catchError(this.handleError<MatchTimeline>(`getMatchTimeline matchId=${matchId}`))
    );
  }

  getAccount(summonerName: string): Observable<Account> {
    this.httpOptions.params = this.httpOptions.params.set('endpoint', `/lol/summoner/v4/summoners/by-name/${summonerName}`);

    return this.http.get<Account>(this.url, this.httpOptions).pipe(
      tap(_ => console.log(`fetched Account summonerName=${summonerName}`)),
      catchError(this.handleError<Account>(`getAccount summonerName=${summonerName}`))
    );
  }

  getRankedEntries(id: string): Observable<RankedEntry[]> {
    this.httpOptions.params = this.httpOptions.params.set('endpoint', `/lol/league/v4/entries/by-summoner/${id}`);

    return this.http.get<RankedEntry[]>(this.url, this.httpOptions).pipe(
      tap(_ => console.log(`fetched RankedEntry id=${id}`)),
      catchError(this.handleError<RankedEntry[]>(`getRankedEntry id=${id}`))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`LeagueApiService: ${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

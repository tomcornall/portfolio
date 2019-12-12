import { Injectable } from '@angular/core';
import { Matchlist } from './matchlist';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { MatchTimeline } from './match-timeline';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(
    private http: HttpClient
  ) { }

  getMatchlist(id: string): Observable<Matchlist> {
    const url = 'https://4fc2bs5006.execute-api.us-west-2.amazonaws.com/default/leagueAPIGateway';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: new HttpParams()
        .set('endpoint', `/lol/match/v4/matchlists/by-account/${id}?endIndex=15`)
        .set('token', 'RGAPI-05315f61-bd45-4418-aa8c-ae7a6bac14f7')
    };

    return this.http.get<Matchlist>(url, httpOptions).pipe(
      tap(_ => console.log(`fetched Matchlist id=${id}`)),
      catchError(this.handleError<Matchlist>(`getMatchlist id=${id}`))
    );
  }

  getMatchTimeline(matchId: number): Observable<MatchTimeline> {
    const url = 'https://4fc2bs5006.execute-api.us-west-2.amazonaws.com/default/leagueAPIGateway';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: new HttpParams()
        .set('endpoint', `/lol/match/v4/timelines/by-match/${matchId}`)
        .set('token', 'RGAPI-05315f61-bd45-4418-aa8c-ae7a6bac14f7')
    };

    return this.http.get<MatchTimeline>(url, httpOptions).pipe(
      tap(_ => console.log(`fetched MatchTimeline matchId=${matchId}`)),
      catchError(this.handleError<MatchTimeline>(`getMatchTimeline matchId=${matchId}`))
    );
  }

  // getMatchTimeline()

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
      console.log(`MatchService: ${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
